import {ImparsableClass, property} from "../index";

@ImparsableClass()
export class User {
    @property({parsedName: 'Name'}) name: string = 'John';
    @property({parsedName: 'Surname'}) surname: string = 'Doe';
    @property({parsedName: 'Timestamp'}) lastUpdated: Date = new Date();

    @property() get fullName() {
        return this.name + ' ' + this.surname;
    }
}

@ImparsableClass()
export class SuperUser extends User {
    @property() role: string = 'role';
}

@ImparsableClass()
export class AdminUser extends User {
    @property() virgin: 'yes' | 'no' = 'no';
}