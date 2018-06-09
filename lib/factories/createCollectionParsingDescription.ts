import {ImparsableConstructor} from "../parsing/json/Imparsable";
import {CollectionParsingDescription} from "../types";

export function createCollectionParsingDescription<T>(type: ImparsableConstructor<T>): CollectionParsingDescription<T> {
    return {
        type,
        itemProperty: undefined,
        toParsable: x => x as any,
        factory: x => x as any
    };
}