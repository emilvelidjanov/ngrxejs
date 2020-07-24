import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { editorsReducer } from './editor/editor.reducer';
import { Editors } from './editor/editor.state';

export const editorFeatureKey = 'editor';

export interface EditorState {
  editors: Editors;
}

export const reducers: ActionReducerMap<EditorState> = {
  editors: editorsReducer,
};

export const metaReducers: MetaReducer<EditorState>[] = !environment.production ? [] : [];

export const selectEditorFeature = createFeatureSelector<EditorState>(editorFeatureKey);
export const selectEditors = createSelector(selectEditorFeature, (state: EditorState) => state.editors);
