import { editorAppStateConfig } from './editor.state';
import { selectEditor } from '..';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';

const defAppSelectors = { ...editorAppStateConfig.getSelectors(selectEditor, fileSelectors) };

export const editorSelectors = {
  ...defAppSelectors,
};
