import { fileStoreConfig } from './file.state';
import { selectFiles } from '..';


export const fileSelectors = {
  ...fileStoreConfig.getSelectors(selectFiles),
};