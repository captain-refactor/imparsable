import {IValidator} from "../validation/validator";
import {DescriptionManager} from "../description-manager";

export function validate(...validators: IValidator[]) {
    return <T, K extends keyof T>(target: T, key: K) => {
        DescriptionManager.addValidators(target, key, validators);
    }
}