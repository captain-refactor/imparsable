export type ValidationError = string;

export interface IValidator<T = any> {
    (prop: T): ValidationError | null;
}