import {ImparsableConstructor} from "..";
import {Property, PropertyID} from "../property";
import {ModelParsingSchema, ParsingSchema} from "../types";
import {isXBeforeParsing, isXOnParsed} from "..";
import {ParsableType} from "../common";


export const defaultModelFactory = function <T>(this: ModelParsingSchema<T>, obj: any): T {
    if (obj === null) return null;
    if (obj === undefined) return undefined;

    // get object metadata
    let newInstance: T = new this.type();
    if (isXBeforeParsing(newInstance)) {
        newInstance.beforeParsing(obj);
    }

    let propertiesArray: (keyof T & string)[] = Object.getOwnPropertyNames(this.properties) as any;
    for (let key of propertiesArray) {
        let description: Property<any> = this.properties[key];
        let propertyValue: any = obj[description.parsedName];
        let parsed: T[];
        if (propertyValue === undefined || propertyValue === null) {
            parsed = propertyValue;
        } else {
            parsed = description.factory(propertyValue);
        }
        if (parsed !== undefined && !description.getOnly) newInstance[description.name] = parsed;

    }

    if (isXOnParsed(newInstance)) {
        newInstance.onParsed(obj);
    }
    return newInstance;
};


const toParsable = function <T>(this: ModelParsingSchema<T>, obj: T): any {
    let resultObject: { [key: string]: ParsableType } = {};
    let propertiesArray: (keyof T & string)[] = Object.getOwnPropertyNames(this.properties) as any;
    for (let key of propertiesArray) {
        let description: ParsingSchema<any> & PropertyID = this.properties[key];
        let propertyValue: any = obj[description.name];
        resultObject[description.parsedName as any] = description.toParsable(propertyValue);
    }
    return resultObject;
};

export function createModelParsingDescription<T, C extends ImparsableConstructor<T> = ImparsableConstructor<T>>(constructor: C): ModelParsingSchema<T> {
    return {
        factory: defaultModelFactory,
        properties: {},
        toParsable: toParsable, //this is handled by the toJSON
        type: constructor
    };
}