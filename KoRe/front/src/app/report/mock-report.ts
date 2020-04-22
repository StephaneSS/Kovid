import { Report, OutputType, ArgType } from '../custom-classes';
import { INPUT_ARGS } from './mock-input-args'; // FIXME: Only for mocking
import { SCHEDULES } from './mock-schdules'; // FIXME: Only for mocking
import { DESTIATIONS } from './mock-destinations'; // FIXME: Only for mocking
import { EXECUTIONS } from './mock-executions';
import { POSTPROCESSES } from './mock-postprocess';

export const REPORT: Report = {
    name: 'Report name',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat justo quis tincidunt ultricies. Morbi sollicitudin felis id aliquam interdum. Mauris pretium, urna eu facilisis tincidunt, ante tellus commodo sem, nec suscipit ante odio nec lorem. Quisque finibus vel risus non imperdiet. Nam eu feugiat erat, sit amet consectetur turpis.',
    output: {
        parameters: [
            {
                key: 'source_file',
                order: 1,
                type: ArgType.STRING,
                value: '~/my_file.csv'
            }
        ],
        type: OutputType.CSV,
    },
    arguments: INPUT_ARGS,
    schedules: SCHEDULES,
    postProcesses: POSTPROCESSES,
    //destinations: DESTIATIONS,
    executionLogs: EXECUTIONS
};

export const REPORT2: Report = {
  "id":5,
  "name":"toto",
  "description":"titi",
  "schedules":[{
    "id": 5,
    "cronExpression": "* * * * *",
    "environment": {
      "id": 1,
      "type": "DEV",
      "name": "env"
    },
    "destinations": {
      "id": 6,
      "smtp": [],
      "ftp": [],
      "sftp": [],
      "folder": []
    }
  }],
  "arguments":[{
    "id":7,
    "type":ArgType.STRING,
    "order":1,
    "key":"string",
    "value":"string"
  }],
  "postProcesses": [], // added
  "executionLogs":[]
};
