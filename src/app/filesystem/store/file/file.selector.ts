import { fileStoreConfig } from './file.state';
import { selectFiles } from '..';


const defSelectors = {...fileStoreConfig.getSelectors(selectFiles)};

export const fileSelectors = {
  ...defSelectors,
};
