import {AdminUser, SuperUser, UserSpec} from "./user.spec";
import {Imparsable} from "..";
import * as assert from "assert";


describe('Integration test', function () {
    it('should stringify and parse', function () {
        function testIt(item) {
            let itemString = JSON.stringify(item, undefined, 2);
            let parsedItem = Imparsable.parse(item.constructor as any, itemString);
            assert.deepEqual(parsedItem, item, 'Cannot parse ' + item.constructor.name);
        }
        testIt(new UserSpec());
        testIt(new SuperUser());
        testIt(new AdminUser());
    });
});
