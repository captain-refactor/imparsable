import {ImparsableConstructor} from "../parsing/json/Imparsable";
import {ParsingDescription} from "../types";

export function createParsingDescription<T>(type: ImparsableConstructor<T>): ParsingDescription<T> {
    return {
        type,
        toParsable: x => x as any,
        factory: x => x as any
    };
}