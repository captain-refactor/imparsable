import {ImparsableConstructor} from "../parsing/json/Imparsable";
import {ParsingSchema} from "../types";

export function createParsingDescription<T>(type: ImparsableConstructor<T>): ParsingSchema<T> {
    return {
        type,
        toParsable: x => x as any,
        factory: x => x as any
    };
}