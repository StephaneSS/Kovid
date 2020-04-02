import { PostProcess } from '../custom-classes';

export const POSTPROCESSES: PostProcess<any>[] = [
  {
    type: 'CustomScript',
    order: 2,
    data: {
      id: 45894,
      name: 'move file'
    }
  },
  {
    type: 'CustomScript',
    order: 1,
    data: {
      id: 5648,
      name: 'format files'
    }
  },
  {
    type: 'CustomScript',
    order: 3,
    data: {
      id: 5648,
      name: 'clean all'
    }
  },
];
