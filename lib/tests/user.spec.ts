import {Imparsable, ImparsableClass, property} from "..";
import * as assert from 'assert';

@ImparsableClass()
export class UserSpec {
    @property({parsedName: 'Name'}) name: string = 'John';
    @property({parsedName: 'Surname'}) surname: string = 'Doe';
    @property({parsedName: 'Timestamp'}) lastUpdated: Date = new Date();

    @property() get fullName() {
        return this.name + ' ' + this.surname;
    }
}

@ImparsableClass()
export class SuperUser extends UserSpec {
    @property() role: string = 'role';
}

@ImparsableClass()
export class OverriddenSuperUser extends UserSpec {
    @property({parsedName: 'Role'}) role: string = 'role';
}

@ImparsableClass()
export class AdminUser extends UserSpec {
    @property() virgin: 'yes' | 'no' = 'no';
}

describe('Imparsable parsing ', function () {
    let inputData = {
        Name: 'Jan',
        name: 'Yann',
        Timestamp: "2017-08-16",
        role: 'paladin',
        Role: 'mage'
    };
    it('should parse right value on User', function () {
        let user = Imparsable.parseObject(UserSpec, inputData);
        assert.strictEqual(user.name, 'Jan');
        assert.ok(!(user as any).Name);
        assert.strictEqual(user.surname, 'Doe');
        assert.ok(user.lastUpdated instanceof Date);
        assert.strictEqual((user as any).role, undefined);
    });

    it('should parse right value on SuperUser', function () {
        let user = Imparsable.parseObject(SuperUser, inputData);
        assert.strictEqual(user.name, 'Jan');
        assert.ok(!(user as any).Name);
        assert.strictEqual(user.surname, 'Doe');
        assert.ok(user.lastUpdated instanceof Date);
        assert.strictEqual((user as any).role, 'paladin');
    });

    it('should parse right value on OverriddenSuperUser', function () {
        let user = Imparsable.parseObject(OverriddenSuperUser, inputData);
        assert.strictEqual(user.name, 'Jan');
        assert.ok(!(user as any).Name);
        assert.strictEqual(user.surname, 'Doe');
        assert.ok(user.lastUpdated instanceof Date);
        assert.strictEqual(user.role, 'mage');
        assert.strictEqual((user as any).Role, undefined);
    });
});