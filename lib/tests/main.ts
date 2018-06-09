import {AdminUser, SuperUser, User} from "./User";
import {Imparsable} from "..";
import {DescriptionManager} from "../DescriptionManager";

function testIt(u: User) {
    console.log(u);
    let userString = JSON.stringify(u, undefined, 2);
    console.log(userString);
    let parsedUser = Imparsable.parse(u.constructor as any, userString);
    console.log(Object.keys(parsedUser));
    console.log(JSON.stringify(DescriptionManager.getDescription(u.constructor as any), undefined, 2));
}

testIt(new User());
testIt(new SuperUser());
testIt(new AdminUser());