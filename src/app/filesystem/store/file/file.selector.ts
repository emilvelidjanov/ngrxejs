import { fileStoreConfig, Files } from './file.state';
import { selectFiles } from '..';
import { createSelector } from '@ngrx/store';


const defSelectors = { ...fileStoreConfig.getSelectors(selectFiles) };
const selectLoadedDirectoryIds = createSelector(selectFiles,
  (files: Files) => files.loadedDirectoryIds
);

export const fileSelectors = {
  ...defSelectors,
  selectLoadedDirectoryIds: selectLoadedDirectoryIds,
};
