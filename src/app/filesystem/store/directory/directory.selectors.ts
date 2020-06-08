import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';
import { PropId } from 'src/app/core/ngrx/store-configurer';

import { selectDirectories } from '..';

import { Directories, directoryStoreConfig } from './directory.state';

const defSelectors = { ...directoryStoreConfig.getSelectors(selectDirectories) };
const selectLoadedDirectoryIds = createSelector(
  selectDirectories,
  (directories: Directories) => directories.loadedDirectoryIds,
);
const selectIsLoadedDirectoryId = createSelector(selectLoadedDirectoryIds, (ids: Id[], props: PropId) =>
  ids.includes(props.id),
);
const selectOpenedDirectoryIds = createSelector(
  selectDirectories,
  (directories: Directories) => directories.openedDirectoryIds,
);
const selectIsOpenedDirectoryId = createSelector(selectOpenedDirectoryIds, (ids: Id[], props: PropId) =>
  ids.includes(props.id),
);

export const directorySelectors = {
  ...defSelectors,
  selectLoadedDirectoryIds,
  selectIsLoadedDirectoryId,
  selectOpenedDirectoryIds,
  selectIsOpenedDirectoryId,
};
