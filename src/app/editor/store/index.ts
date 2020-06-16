import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { editorReducer } from './editor/editor.reducer';
import { Editor } from './editor/editor.state';

export const editorFeatureKey = 'editor';

export interface EditorState {
  editor: Editor;
}

export const reducers: ActionReducerMap<EditorState> = {
  editor: editorReducer,
};

export const metaReducers: MetaReducer<EditorState>[] = !environment.production ? [] : [];

export const selectEditorFeature = createFeatureSelector<EditorState>(editorFeatureKey);
export const selectEditor = createSelector(selectEditorFeature, (state: EditorState) => state.editor);
