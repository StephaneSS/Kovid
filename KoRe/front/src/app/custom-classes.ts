export enum ArgType {
    STRING = "String",
    NUMBER = "Number",
    DYNAMIC_DATE = "Dynamic Date"
}

export class inputArg {
    order: number;
    name: string;
    value: any;
    type: ArgType;
}