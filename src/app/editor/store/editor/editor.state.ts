import { EntityAppState } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state-configurer';
import { entityName, File } from 'src/app/filesystem/store/file/file.state';

export interface Editor extends EntityAppState {}

const initialState: Editor = {
  openedIds: [],
  focusedId: null,
};

export const editorAppStateConfig: EntityAppStateConfigurer<File, Editor> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
