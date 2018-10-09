import {DescriptionManager} from "../../description-manager";
import {Constructor} from "../..";
import {ParsingSchema} from "../../types";
import {ValidationError} from "../../validation/validator";


export interface ImparsableConstructor<T> {
    new(): T;
}

export class Imparsable {
    public static parseObject<T>(constructor: ImparsableConstructor<T>, obj: {} | string | number | boolean | any[]): T {
        if (obj === null) return null;
        if (obj === undefined) return undefined;
        let description = DescriptionManager.getDescription(constructor);
        return this.parseProperty(description, obj);
    }

    public static parseProperty<T>(description: Pick<ParsingSchema<T>, 'factory'>, obj: any): T {
        if (obj === null) return null;
        if (obj === undefined) return undefined;
        if (description.factory === undefined) return obj as T;
        return description.factory(obj);
    }

    public static parse<T>(constructor: ImparsableConstructor<T>, json: string): T {
        let desc = DescriptionManager.getDescription(constructor);
        return Imparsable.parseFromDescription(desc, json);
    }

    public static validate<T>(item: T): ValidationError[] | null {
        let schema = DescriptionManager.getDescription(item.constructor as any);
        let {validators} = schema;
        if (!validators || validators.length == 0) return null;
        let errors = validators.map(validator => validator(item));
        if (errors.length == 0) return null;
        return errors;
    }


    public static parseFromDescription<T>(description: Pick<ParsingSchema<T>, 'factory'>, jsonData: string): T {
        return Imparsable.parseProperty(description, JSON.parse(jsonData));
    }

    public static stringify<T>(obj: T) {
        let classDescription = DescriptionManager.getClassDescription(obj.constructor as Constructor<T>);
        return classDescription.toParsable(obj);
    }
}
