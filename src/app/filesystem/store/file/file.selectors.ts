import { fileStoreConfig, Files } from './file.state';
import { selectFiles } from '..';
import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';
import { PropId } from 'src/app/core/ngrx/store-configurer';


const defSelectors = { ...fileStoreConfig.getSelectors(selectFiles) };
const selectLoadedDirectoryIds = createSelector(selectFiles,
  (files: Files) => files.loadedDirectoryIds
);
const selectIsLoadedDirectoryId = createSelector(selectLoadedDirectoryIds,
  (ids: Id[], props: PropId) => ids.includes(props.id),
);
const selectOpenedDirectoryIds = createSelector(selectFiles,
  (files: Files) => files.openedDirectoryIds
);
const selectIsOpenedDirectoryId = createSelector(selectOpenedDirectoryIds,
  (ids: Id[], props: PropId) => ids.includes(props.id),
);

export const fileSelectors = {
  ...defSelectors,
  selectLoadedDirectoryIds,
  selectIsLoadedDirectoryId,
  selectOpenedDirectoryIds,
  selectIsOpenedDirectoryId,
};
