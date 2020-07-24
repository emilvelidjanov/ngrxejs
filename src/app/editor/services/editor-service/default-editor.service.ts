import { Store } from '@ngrx/store';
import { Files } from 'src/app/filesystem/store/file/file.state';

import { EditorService } from './editor.service';

export class DefaultEditorService implements EditorService {
  constructor(private store: Store<Files>) {}
}
