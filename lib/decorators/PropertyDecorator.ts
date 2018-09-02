import {Constructor} from "./ClassDecorator";
import {DescriptionManager} from "../description-manager";
import {Property} from "../property";
import {CollectionProperty, ParsingDescription} from "../types";

//TODO: solve how to do input parameters
let d: PropertyDecorator = () => 5;

export function property(parameters?: Partial<Property<any>>) {

    if (parameters == null) parameters = {};

    return function <T, K extends keyof T>(target: T, key: K, descriptor?: TypedPropertyDescriptor<T[K]>) {
        if (descriptor != null) parameters.getOnly = descriptor.set == null;
        DescriptionManager.decoratePropertyWithParameters(target, key, parameters);
    };
}


export function collectionOf<I>(input: Constructor<I>, parameters?: Partial<CollectionProperty<any>>, itemsDescription?: Partial<ParsingDescription<I>>) {
    if (parameters == null) parameters = {};
    parameters.itemProperty = DescriptionManager.autoCreateComplexDescription(Object.assign({
        type: input
    }, itemsDescription));
    return function <T, K extends keyof T>(target: T, key: K, descriptor?: TypedPropertyDescriptor<T[K]>) {
        if (descriptor != null) parameters.getOnly = descriptor.set == null;
        DescriptionManager.decoratePropertyWithParameters(target, key, parameters);
    };
}