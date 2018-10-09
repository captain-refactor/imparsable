import {pick} from "./pick";
import {ok} from "assert";

describe('pick function', function () {
    it('should pick one attribute', function () {
        let result = pick({a: '1', b: '2'}, ['a']);
        let keys = Object.keys(result);
        ok(keys.length == 1);
        ok(keys[0] == 'a');
    });
});