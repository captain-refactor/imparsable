export interface XOnParsed {
    onParsed(rawObject: any): void;
}

export function isXOnParsed(obj: any): obj is XOnParsed {
    return 'onParsed' in obj;
}

export interface XBeforeParsing {
    beforeParsing(obj: any): void;
}

export function isXBeforeParsing(obj: any): obj is XBeforeParsing {
    return 'beforeParsing' in obj;
}

export interface XToJSON {
    toJSON(): any;
}