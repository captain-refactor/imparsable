import stringify = require('csv-stringify/lib/sync');

export type StringifyWithObjects = (input: any[], opts: stringify.StringifyOpts) => string;
const csv = stringify as StringifyWithObjects;

export type ObjectToJSON = { toJSON(): any };

export function stringifyToCsvString(obj: ObjectToJSON | ObjectToJSON[] | any): string {
    let halfDoneObject: any;
    if (obj.toJSON != null) {
        halfDoneObject = obj.toJSON();
    } else if (Array.isArray(obj)) {
        halfDoneObject = [];
        for (let item of obj) {
            halfDoneObject.push(item.toJSON());
        }
    } else {
        halfDoneObject = obj;
    }
    return csv(halfDoneObject, {delimiter: ',', header: true, rowDelimiter: '\r\n', quoted: true});
}
