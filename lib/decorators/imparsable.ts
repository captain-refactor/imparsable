import {Imparsable} from "..";
import {DescriptionManager} from "../description-manager";
import {ParsingSchema} from "../types";


export type Constructor<T extends Object> = {
    new(): T;
}

export type DecoratedClass<C extends Constructor<Object>> = C & { prototype: { toJSON(): any } };

export type ClassDecoratorOptions<T> = Partial<ParsingSchema<T>>

export function imparsable<T>(parsingDescription?: ClassDecoratorOptions<T>) {

    return function <C extends Constructor<T>>(constructor: C): DecoratedClass<C> {
        let maker = new ClassDecoratorMaker<T, C>();
        if (parsingDescription) DescriptionManager.mergeDescription(constructor, parsingDescription);
        // constructor = DescriptionManager.decorateClass<T>(constructor, parsingDescription) as C;
        return maker.decorateConstructor(constructor);
    }
}

class ClassDecoratorMaker<T, C extends Constructor<T>> {
    decorateConstructor(constructor: C): DecoratedClass<C> {
        if (constructor.prototype.toJSON == null) {
            constructor.prototype.toJSON = function () {
                return Imparsable.stringify(this);
            };
        }
        return constructor;
    }
}