export function pick<T = any, K extends keyof T = keyof T>(target: T, pick: K[]): Pick<T, K>{
    let outputObject:{[key:string]: any} = {};
    for(let key of pick){
        outputObject[key] = target[key];
        delete target[key];
    }
    return outputObject as any;
}