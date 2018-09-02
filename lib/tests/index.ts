import {AdminUser, SuperUser, UserSpec} from "./user.spec";
import {Imparsable} from "..";

function testIt(u: UserSpec) {
    console.log(u);
    let userString = JSON.stringify(u, undefined, 2);
    console.log(userString);
    let parsedUser = Imparsable.parse(u.constructor as any, userString);
    console.log(Object.keys(parsedUser));
}

testIt(new UserSpec());
testIt(new SuperUser());
testIt(new AdminUser());