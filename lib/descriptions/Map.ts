import {CollectionParsingDescription} from "../types";
import {createCollectionParsingDescription} from "../factories/createCollectionParsingDescription";

export const MAP_DESCRIPTION: CollectionParsingDescription<Map<any, any>> = createCollectionParsingDescription(Map);
MAP_DESCRIPTION.factory = (obj: any) => {
    let result = new Map();
    const keys = Object.keys(obj);
    for (let key of keys) {
        result.set(key, this.itemProperty.factory(obj[key]));
    }
    return result;
};

MAP_DESCRIPTION.toParsable = (map: Map<any, any>) => {
    let result: any = {};
    map.forEach((value, key) => {
        result[key] = this.itemProperty.toParsable(value);
    });
    return result;
};