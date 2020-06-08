import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';
import { PropId } from 'src/app/core/ngrx/store-configurer';

import { selectFiles } from '..';

import { Files, fileStoreConfig } from './file.state';

const defSelectors = { ...fileStoreConfig.getSelectors(selectFiles) };
const selectLoadedFileIds = createSelector(selectFiles, (files: Files) => files.loadedFileIds);
const selectIsLoadedFileId = createSelector(selectLoadedFileIds, (ids: Id[], props: PropId) => ids.includes(props.id));
const selectOpenedFileIds = createSelector(selectFiles, (files: Files) => files.openedFileIds);
const selectIsOpenedFileId = createSelector(selectOpenedFileIds, (ids: Id[], props: PropId) => ids.includes(props.id));

export const fileSelectors = {
  ...defSelectors,
  selectLoadedFileIds,
  selectIsLoadedFileId,
  selectOpenedFileIds,
  selectIsOpenedFileId,
};
