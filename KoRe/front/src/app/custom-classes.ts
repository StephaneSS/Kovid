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

export enum DestinationProtocole {
    SMTP = "SMTP",
    FTP = "FTP",
    SFTP = "SFTP",
    FOLDER = "FOLDER"
}

export interface Server {
    protocol: string;
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

export interface Report {
    name: string;
    description: string;
    output: ReportOutput;
    //opr: File;
    input_args: InputArg[];
    schedules: Schedule[];
    //postProcesses: PostProcess[];
    destinations: Destinations;
    //executions: Execution[];
}

