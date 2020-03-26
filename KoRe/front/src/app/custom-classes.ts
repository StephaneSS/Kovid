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

export enum DestinationProtocole {
    SMTP = "SMTP",
    FTP = "FTP",
    SFTP = "SFTP",
    FOLDER = "FOLDER"
}

export interface UrlLike{
    user: string;
    host: string;
    path: string;
    port: number;
}

export class Destinations {
    [DestinationProtocole.SMTP]: DestinationSMTP[] = [];
    [DestinationProtocole.FTP]: DestinationFTP[] = [];
    [DestinationProtocole.SFTP]: DestinationSFTP[] = [];
    [DestinationProtocole.FOLDER]: DestinationFOLDER[] = [];
}

export class DestinationSMTP {
    email: string;
    object: string;
}

export class DestinationFTP implements UrlLike {
    user: string;
    host: string;
    path: string;
    port: number;
}

export class DestinationSFTP implements UrlLike {
    user: string;
    host: string;
    path: string;
    port: number;
}

export class DestinationFOLDER {
    path: string;
}

export class Report {
    name: string;
    description: string;
    input_args: InputArg[];
    schedules: Schedule[];
    //postProcesses: PostProcess[];
    destinations: Destinations;
    //executions: Execution[];

}