import {Property, PropertyID} from "./property";
import {IDictionary, ParsableType} from "./common";
import {ImparsableConstructor} from "./parsing/json/Imparsable";
import {IValidator} from "./validation/validator";

export interface TypeDescription<T> {
    type: ImparsableConstructor<T>;
}

export interface ParsingSchema<T> extends TypeDescription <T> {
    toParsable(property?: T): ParsableType;

    validators?: IValidator<T>[];

    factory(obj: any): T;
}

export interface ModelTypeDescription<T> extends TypeDescription<T> {
    properties: IDictionary<PropertyID>;
}

export interface ModelParsingSchema<T = any> extends ParsingSchema<T>, ModelTypeDescription<T> {
    properties: IDictionary<Property<any>>;
}

export interface CollectionTypeDescription<C, T = any> extends TypeDescription<C> {
    itemProperty: TypeDescription<T>;
}

export interface CollectionParsingDescription<C, T = any> extends ParsingSchema<C>, CollectionTypeDescription<C, T> {
    itemProperty: ParsingSchema<T>;
}

export interface CollectionProperty<C, T = any> extends CollectionParsingDescription<C, T>, PropertyID {
}
