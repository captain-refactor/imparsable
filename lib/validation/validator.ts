import {DescriptionManager} from "../description-manager";
import {ParsingSchema} from "../types";

export type ErrorMessage = string;

export type IValidator<T = any> = (prop: T) => ErrorMessage | null;

export interface IValidationError {
    path: string;
    message: string;
}

export class Validator {
    public static validate<T>(item: T): IValidationError[] | null {
        //TODO: validate childs
        const schema: ParsingSchema<T> = DescriptionManager.getDescription(item.constructor as any);
        const {validators} = schema;
        if (!validators || validators.length === 0) {
            return null;
        }
        const errors = validators.map((validator) => validator(item));
        if (errors.length === 0) {
            return null;
        }
        return errors.map(message => ({message, path: ''}));
    }
}
