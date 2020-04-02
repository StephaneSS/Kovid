import { PostProcess } from '../custom-classes';

export const POSTPROCESSES: PostProcess[] = [
    {
      order: 1,
      name: 'Execute custom script',
      value: 'cp $file $HOME/GENERATION_FILES/EXPECTPAY/.'
    }
    
  ];