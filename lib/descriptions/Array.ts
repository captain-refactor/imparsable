import {CollectionParsingDescription} from "../types";
import {createCollectionParsingDescription} from "../factories/createCollectionParsingDescription";

export const ARRAY_DESCRIPTION: CollectionParsingDescription<Array<any>, any> = createCollectionParsingDescription(Array);
ARRAY_DESCRIPTION.factory = (arr: any[]) => {
    if (arr == null) return arr;
    return arr.map(item => this.itemProperty.factory(item));
};

ARRAY_DESCRIPTION.toParsable = (arr: any[]) => {
    if (arr == null) return arr;
    return arr.map(item => this.itemProperty.toParsable(item));
};