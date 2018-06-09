import {ParsingDescription} from "../types";
import {createParsingDescription} from "../factories/createParsingDescription";

export const DATE_DESCRIPTION: ParsingDescription<Date> = Object.assign(createParsingDescription(Date),
{
    factory : (obj: string): Date => {
        let date = new Date(obj);
        if (isNaN(date.getTime())) return undefined;
        return date;
    }
});