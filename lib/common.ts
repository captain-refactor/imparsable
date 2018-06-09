
export const CLASSPARSINGDEFINITION = 'CLASSPARSINGDEFINITION';
export const PROPERTYDECORATORPREFIX = 'IMPARSABLEPROP_';
export const PROPERTYDEFINITIONKEY = 'PROPERTYDEFINITION';
export const IMPARSABLE = 'imparsable';
// export type ParsingDescriptionsMap<ClassType> = {[K in keyof ClassType]?: IPropertyDescription<ClassType[K]>}
export type KeysOf<T> = (keyof T)[];
export type Primitive = string | number | null | boolean;
export type ParsableType = Primitive | { [key: string]: Primitive } | Primitive[];
export interface IDictionary<T>{
    [key: string]: T;
}
