import { createSelector } from '@ngrx/store';

import { selectEditors } from '..';

import { editorDomainStateConfig } from './editor.state';

const defAppSelectors = { ...editorDomainStateConfig.getSelectors(selectEditors) };

export const editorSelectors = {
  ...defAppSelectors,
};
