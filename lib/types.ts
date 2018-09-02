import {Property, PropertyID} from "./property";
import {IDictionary, ParsableType} from "./common";
import {ImparsableConstructor} from "./parsing/json/Imparsable";

export interface TypeDescription<T> {
    type: ImparsableConstructor<T>;
}

export interface ParsingDescription<T> extends TypeDescription <T> {
    toParsable(property?: T): ParsableType;
    factory(obj: any): T;
}

export interface ModelTypeDescription<T> extends TypeDescription<T> {
    properties: IDictionary<PropertyID>;
}

export interface ModelParsingDescription<T = any> extends ParsingDescription<T>, ModelTypeDescription<T> {
    properties: IDictionary<Property<any>>;
}

export interface CollectionTypeDescription<C, T = any> extends TypeDescription<C> {
    itemProperty: TypeDescription<T>;
}

export interface CollectionParsingDescription<C, T = any> extends ParsingDescription<C>, CollectionTypeDescription<C, T> {
    itemProperty: ParsingDescription<T>;
}

export interface CollectionProperty<C, T = any> extends CollectionParsingDescription<C, T>, PropertyID {
}
