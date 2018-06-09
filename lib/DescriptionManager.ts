import {Reflect} from 'core-js/es7';
import {IMPARSABLE} from "./common";
const dcopy = require('deep-copy');
import {ImparsableConstructor} from "./parsing/json/Imparsable";

import {Property, PropertyID} from "./Property";
import {
    CollectionParsingDescription, ModelParsingDescription,
    ParsingDescription
} from "./types";
import {createModelParsingDescription} from "./factories/createModelParsingDescription";
import {createParsingDescription} from "./factories/createParsingDescription";
import {DATE_DESCRIPTION} from "./descriptions/Date";
import {MAP_DESCRIPTION} from "./descriptions/Map";
import {SET_DESCRIPTION} from "./descriptions/Set";

//[key, constructor]
export type DescriptionRecord<T> = [ImparsableConstructor<T>, ParsingDescription<T>];

export class DescriptionManager {

    public static decoratePropertyWithParameters<T, K extends keyof T>(target: T, key: K, parameters: Partial<Property<T[K]>>) {
        if (parameters.type == null) parameters.type = this.getPropertyType(target, key);
        let {name = key, parsedName = name} = parameters;
        let propertyId = new PropertyID(name, parsedName, parameters.getOnly);
        let description: ParsingDescription<T[K]> = this.autoCreateComplexDescription(parameters);
        let property: Property<T[K]> = Object.assign(dcopy(description), propertyId);
        this.decorateProperty(target, key, property);
    }

    public static decorateProperty<T, K extends keyof T, V extends T[K] = T[K]>(target: T, key: K, property: Property<V>) {
        let classDescription: ModelParsingDescription<T> = this.getClassDescription<T>(
            target.constructor as ImparsableConstructor<T>,
            ()=> createModelParsingDescription<T>(target.constructor as any)
        );
        classDescription.properties[key] = property;
        // classDescription.classConstructor = target.constructor as any;
        this.setClassDescription(target.constructor as ImparsableConstructor<T>, classDescription);
    }

    private static getPropertyType<I>(instance: I, property: keyof I): any {
        return Reflect.getMetadata('design:type', instance, property);
    }

    public static getClassDescription<T>(constructor: ImparsableConstructor<T>, defaultValueFactory: ()=>ModelParsingDescription<T> = undefined): ModelParsingDescription<T> {
        let description: ModelParsingDescription<T> = Reflect.getOwnMetadata(IMPARSABLE, constructor);
        if (!description) {
            let parentDescription: ModelParsingDescription<T> = Reflect.getMetadata(IMPARSABLE, constructor);
            if (parentDescription) {
                description = dcopy(parentDescription);
                description.type = constructor;
            }
        }
        if (!description) description = defaultValueFactory && defaultValueFactory();
        return description;
    }

    public static getDescription<T>(constructor: ImparsableConstructor<T>): ParsingDescription<T> {
        let description: ParsingDescription<T> = this.getClassDescription(constructor);
        if (!description) description = dcopy(this.getDefaultParsingDescription(constructor));
        return description;
    }

    public static setClassDescription<T>(constructor: ImparsableConstructor<T>, desc: ModelParsingDescription<T>) {
        // constructor[IMPARSABLE + '_classDescription'] = desc;
        Reflect.defineMetadata(IMPARSABLE, desc, constructor);
    }

    public static mergeDescription<T>(constructor: ImparsableConstructor<T>, desc: Partial<ParsingDescription<T>>){
        let description = this.getDescription(constructor);
        Object.assign(description, desc);
        this.setClassDescription(constructor, description as any);
    }

    private static defaultDescriptions: DescriptionRecord<any>[] = [
        [String, createParsingDescription(String)],
        [Number, createParsingDescription(Number)],
        [Boolean, createParsingDescription(Boolean)],
        [Map, MAP_DESCRIPTION],
        [Set, SET_DESCRIPTION],
        // [Array, ArrayComplexDescription],
        [Date, DATE_DESCRIPTION],
        // [Object, IDictionaryCollectionDescription]
    ];

    public static registerDescription<T>(description: ParsingDescription<T>) {
        let record: DescriptionRecord<T> = [description.type, description];
        this.defaultDescriptions = [record].concat(this.defaultDescriptions);
    }

    public static getDefaultParsingDescription<T>(classType: ImparsableConstructor<T>): ParsingDescription<T> {
        let found = this.defaultDescriptions.find(value => value[0] === classType);
        if (found) return found[1];
        return createParsingDescription(classType);
    }

    public static autoCreateComplexDescription<T>(parameters: Partial<ParsingDescription<T>>): ParsingDescription<T> {
        let complexDescription = this.getClassDescription(parameters.type);
        if (complexDescription) {
            return Object.assign(dcopy(complexDescription), parameters);
        } else {
            let description: ParsingDescription<T> = this.getDefaultParsingDescription(parameters.type);
            return Object.assign(dcopy(description), parameters);
        }
    }

    public static createCollectionComplexDescription<C, T = any>(collection: Partial<CollectionParsingDescription<C, T>>, collectionOf: Partial<ParsingDescription<T>>): CollectionParsingDescription<C, T> {
        collection.itemProperty = this.autoCreateComplexDescription(collectionOf);
        return this.autoCreateComplexDescription(collection) as CollectionParsingDescription<C, T>;
    }
}