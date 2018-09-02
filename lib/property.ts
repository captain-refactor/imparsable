import {ParsingDescription} from "./types";

type ParsedName = number | string;

export class PropertyID {
    name: PropertyKey;
    parsedName: PropertyKey;
    getOnly: boolean;

    constructor(name: PropertyKey, parsedName: PropertyKey = name, getOnly: boolean = false) {
        this.name = name;
        this.parsedName = parsedName;
        this.getOnly = getOnly;
    }
}

export interface Property<T> extends ParsingDescription<T>, PropertyID {
}