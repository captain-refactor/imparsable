import {DescriptionManager} from "../../description-manager";
import {Constructor} from "../../decorators/ClassDecorator";
import {ParsingDescription} from "../../types";


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

    public static parseProperty<T>(description: Pick<ParsingDescription<T>, 'factory'>, obj: any): T {
        if (obj === null) return null;
        if (obj === undefined) return undefined;
        if (description.factory === undefined) return obj as T;
        return description.factory(obj);
    }

    public static parse<T>(constructor: ImparsableConstructor<T>, json: string): T {
        let desc = DescriptionManager.getDescription(constructor);
        return Imparsable.parseFromDescription(desc, json);
    }


    public static parseFromDescription<T>(description: Pick<ParsingDescription<T>, 'factory'>, jsonData: string): T {
        return Imparsable.parseProperty(description, JSON.parse(jsonData));
    }

    public static stringify<T>(obj: T) {
        let classDescription = DescriptionManager.getClassDescription(obj.constructor as Constructor<T>);
        return classDescription.toParsable(obj);
    }
}
