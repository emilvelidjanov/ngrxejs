import { fileStoreConfig, Files } from './file.state';
import { selectFiles } from '..';
import { createSelector } from '@ngrx/store';


const defSelectors = {...fileStoreConfig.getSelectors(selectFiles)};

export const fileSelectors = {
  ...defSelectors,
};
