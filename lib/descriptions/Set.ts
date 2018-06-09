import {ParsingDescription} from "../types";
import {createCollectionParsingDescription} from "../factories/createCollectionParsingDescription";

export const SET_DESCRIPTION: ParsingDescription<Set<any>> = createCollectionParsingDescription(Set);
SET_DESCRIPTION.factory = (arr: any[]) => {
    let s = new Set();
    for (let item of arr) {
        s.add(this.itemProperty.factory(item));
    }
    return s;
};

SET_DESCRIPTION.toParsable = (set: Set<any>) => {
    let arr = [];
    set.forEach(value => arr.push(this.itemProperty.toParsable(value)));
    return arr;
};