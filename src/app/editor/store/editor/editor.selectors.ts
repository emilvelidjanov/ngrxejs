import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';

import { selectEditor } from '..';

import { editorAppStateConfig } from './editor.state';

const defAppSelectors = { ...editorAppStateConfig.getSelectors(selectEditor, fileSelectors) };

export const editorSelectors = {
  ...defAppSelectors,
};
