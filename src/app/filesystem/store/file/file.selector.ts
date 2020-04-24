import { fileStoreConfig, Files } from './file.state';
import { selectFiles } from '..';
import { createSelector } from '@ngrx/store';


const defSelectors = {...fileStoreConfig.getSelectors(selectFiles)};
const selectSelectedFileIds = createSelector(selectFiles, (files: Files) => files.selectedFileIds);

export const fileSelectors = {
  ...defSelectors,
  selectSelectedFileIds: selectSelectedFileIds,
};
