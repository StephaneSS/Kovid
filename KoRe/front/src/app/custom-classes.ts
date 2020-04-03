export enum ArgType {
    STRING = "String",
    NUMBER = "Number",
    DYNAMIC_DATE = "Dynamic Date"
}

export interface InputArg {
    order: number;
    name: string;
    value: any;
    type: ArgType;
}

export interface Schedule {
    cronValue: string;
    text: string;
}

export interface PostProcess<T extends PostProc> {
    order: number;
    type: string;
    data: T;
    type_full?: any;
}

export interface PostProc {
    id: number;
}

export class CustomScript implements PostProc {
    id: number;
    name: string = '';
}

export enum DestinationProtocole {
    SMTP = "SMTP",
    FTP = "FTP",
    SFTP = "SFTP",
    FOLDER = "FOLDER"
}

export interface Server {
    protocol: DestinationProtocole;
    name: string;
    user?: string;
    host: string;
    port?: number;
    password?: string;
}

export interface Destinations {
    [DestinationProtocole.SMTP]: DestinationSMTP[];
    [DestinationProtocole.FTP]: DestinationFTP[];
    [DestinationProtocole.SFTP]: DestinationSFTP[];
    [DestinationProtocole.FOLDER]: DestinationFOLDER[];
}

export interface DestinationSMTP {
    email: string;
    object: string;
}

export interface DestinationFTP {
    server: Server;
    path: string;
}

export interface DestinationSFTP {
    server: Server;
    path: string;
}

export interface DestinationFOLDER {
    path: string;
}

export enum OutputType {
    TXT = 'TXT',
    CSV = 'CSV',
    XLS = 'XLS',
    HISTO = 'HISTO'
}

export interface ReportOutput {
    type: OutputType;
    parameters: InputArg[];
}

export interface Executions {
    order: number;
    name: string;
    startDate: Date;
    endDate : Date;
    status : string;
    path: string;
}
export interface Report {
    name: string;
    description: string;
    output: ReportOutput;
    //opr: File;
    input_args: InputArg[];
    schedules: Schedule[];
    postProcesses: PostProcess<any>[];
    destinations: Destinations;
    executions: Executions[];
}

