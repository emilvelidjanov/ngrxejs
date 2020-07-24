import { editorDomainStateConfig } from './editor.state';
import { selectEditors } from '..';

const defAppSelectors = { ...editorDomainStateConfig.getSelectors(selectEditors) };

export const editorSelectors = {
  ...defAppSelectors,
};
