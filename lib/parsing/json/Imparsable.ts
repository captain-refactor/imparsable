import {Constructor} from "../..";
import {DescriptionManager} from "../../description-manager";
import {ParsingSchema} from "../../types";
import {ErrorMessage, IValidationError, Validator} from "../../validation/validator";

export interface ImparsableConstructor<T> {
    new(): T;
}

type PojoType = {} | string | number | boolean | any[];

export class Imparsable {
    public static parsePojo<T>(constructor: ImparsableConstructor<T>, obj: PojoType): T {
        if (obj === null) {
            return null;
        }
        if (obj === undefined) {
            return undefined;
        }
        const description = DescriptionManager.getDescription(constructor);
        return this.parseProperty(description, obj);
    }

    public static parseProperty<T>(description: Pick<ParsingSchema<T>, "factory">, obj: any): T {
        if (obj === null) {
            return null;
        }
        if (obj === undefined) {
            return undefined;
        }
        if (description.factory === undefined) {
            return obj as T;
        }
        return description.factory(obj);
    }

    public static parse<T>(constructor: ImparsableConstructor<T>, json: string): T {
        const desc = DescriptionManager.getDescription(constructor);
        return Imparsable.parseFromDescription(desc, json);
    }

    public static validate<T>(item: T): IValidationError[] | null {
        return Validator.validate(item);
    }

    public static parseFromDescription<T>(description: Pick<ParsingSchema<T>, "factory">, jsonData: string): T {
        return Imparsable.parseProperty(description, JSON.parse(jsonData));
    }

    public static stringify<T>(obj: T) {
        const classDescription = DescriptionManager.getClassDescription(obj.constructor as Constructor<T>);
        return classDescription.toParsable(obj);
    }
}
