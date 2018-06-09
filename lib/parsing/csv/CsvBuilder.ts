import parse = require('csv-parse/lib/sync');
import {Imparsable} from "../json/Imparsable";
import {Constructor} from "../../decorators/ClassDecorator";

export function buildFromCsv<T>(constructor: Constructor<T>, csv: string, delimiter: string = ';'): T[] {
    let parsedArray: any[] = parse(csv, {columns: true, delimiter: delimiter, comment: '#'});
    return parsedArray.map((value, index, array) => Imparsable.parseObject(constructor, value));
}
