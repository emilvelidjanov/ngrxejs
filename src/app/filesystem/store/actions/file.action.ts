import { createAction, props } from '@ngrx/store';
import { File } from '../state/file.state';


export const addFile = createAction('[File] Add File', props<{file: File}>());
export const addFiles = createAction('[File] Add Files', props<{files: File[]}>());