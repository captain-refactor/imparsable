import {ParsingDescription} from "./types";

export class PropertyID {
    name: string;
    parsedName: string;
    getOnly: boolean;

    constructor(name: string, parsedName: string = name, getOnly:boolean = false) {
        this.name = name;
        this.parsedName = parsedName;
        this.getOnly = getOnly;
    }
}

export interface Property<T> extends ParsingDescription<T>, PropertyID {
}