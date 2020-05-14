import { fileStoreConfig, Files } from './file.state';
import { selectFiles } from '..';
import { createSelector } from '@ngrx/store';


const defSelectors = { ...fileStoreConfig.getSelectors(selectFiles) };
const selectLoadedDirectoryIds = createSelector(selectFiles,
  (files: Files) => files.loadedDirectoryIds
);
const selectOpenedDirectoryIds = createSelector(selectFiles,
  (files: Files) => files.openedDirectoryIds
);

export const fileSelectors = {
  ...defSelectors,
  selectLoadedDirectoryIds,
  selectOpenedDirectoryIds,
};
