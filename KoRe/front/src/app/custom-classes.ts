export enum ArgType {
    STRING = "String",
    NUMBER = "Number",
    DYNAMIC_DATE = "Dynamic Date"
}

export class InputArg {
    order: number;
    name: string;
    value: any;
    type: ArgType;
}

export class Schedule {
    cronValue: string;
    text: string;
}