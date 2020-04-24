export enum ArgType {
  TEXT = "TEXT",
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
  id?: number;
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

export interface Environment {
  id: number;
  name: string;
  type: string,
}

export interface Server {
  id?: number;
  name: string;
  protocol: string;
  username?: string;
  password?: string;
  host: string;
  port?: number;
}


export enum DestinationType {
  EMAIL = "email",
  DIRECTORY = "directory"
}

export interface Destinations {
  id?: number;
  [DestinationType.EMAIL]: DestinationEmail[];
  [DestinationType.DIRECTORY]: DestinationDirectory[];
}

export interface DestinationEmail {
  id?: number;
  active: boolean;
  sendTo: string;
  subject: string;
}

export interface DestinationDirectory {
  id?: number;
  active: boolean;
  server: Server;
  path: string;
}

export interface DestinationDirectory {
  id?: number;
  active: boolean;
  serverConnexion: Server;
  path: string;
}

export interface DestinationDirectory {
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
  id?: number
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

export interface ReportSimple {
  id?: number;
  name: string;
  description: string;
  output?: ReportOutput;
  //opr: File;
  arguments: number[];
  schedules: number[];
  postProcesses: number[];
  //destinations: Destinations;
  executionLogs: Executions[];
}
