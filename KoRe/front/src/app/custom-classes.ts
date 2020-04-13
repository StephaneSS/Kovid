export enum ArgType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  DYNAMIC_DATE = "DYNAMIC_DATE"
}

export interface InputArg {
  id?: number;
  order: number;
  key: string;
  value: any;
  type: ArgType;
}

export interface Schedule {
  id?: number;
  cronExpression: string;
  text?: string;
  environment?: Environment;
  destinations: Destinations;
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
  SMTP = "smtp",
  FTP = "ftp",
  SFTP = "sftp",
  FOLDER = "folder"
}

export interface Environment {
  id: number;
  type: string,
  name: string;
}

export interface Server {
  //protocol: DestinationProtocole;
  name: string;
  username?: string;
  host: string;
  port?: number;
  password?: string;
}

export interface Destinations {
  id?: number;
  [DestinationProtocole.SMTP]: DestinationSMTP[];
  [DestinationProtocole.FTP]: DestinationFTP[];
  [DestinationProtocole.SFTP]: DestinationSFTP[];
  [DestinationProtocole.FOLDER]: DestinationFOLDER[];
}

export interface DestinationSMTP {
  id?: number;
  active: boolean;
  emailAddress: string;
  subject: string;
}

export interface DestinationFTP {
  id?: number;
  active: boolean;
  server: Server;
  path: string;
}

export interface DestinationSFTP {
  id?: number;
  active: boolean;
  server: Server;
  path: string;
}

export interface DestinationFOLDER {
  id?: number;
  active: boolean;
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
  id?: number;
  name: string;
  description: string;
  output?: ReportOutput;
  //opr: File;
  arguments: InputArg[];
  schedules: Schedule[];
  postProcesses: PostProcess<any>[];
  //destinations: Destinations;
  executionLogs: Executions[];
}

export interface Reports {
  id : number;
  name : string ;
  lastExecDate : Date ;
  status : string ;
  env : string ;
}