import { InputArg, ArgType } from '../custom-classes'

export const INPUT_ARGS: InputArg[] = [
  {
    order: 2,
    name: 'execution day',
    type: ArgType.DYNAMIC_DATE,
    value: 'D-1'
  },
  {
    order: 1,
    name: 'branch name',
    type: ArgType.STRING,
    value: 'b1'
  },
  {
    order: 3,
    name: 'queue size',
    type: ArgType.NUMBER,
    value: 7
  }
];
