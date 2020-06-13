import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { selectDirectories } from '..';

import { Directories, directoryEntityAppStateConfig, directoryEntityStateConfig } from './directory.state';

const defSelectors = { ...directoryEntityStateConfig.getSelectors(selectDirectories) };
const defAppSelectors = { ...directoryEntityAppStateConfig.getSelectors(selectDirectories, defSelectors) };
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
  ...defAppSelectors,
  selectLoadedDirectoryIds,
  selectIsLoadedDirectoryId,
  selectOpenedDirectoryIds,
  selectIsOpenedDirectoryId,
};
