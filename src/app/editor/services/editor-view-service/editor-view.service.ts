import { File } from 'src/app/filesystem/store/file/file.state';

import { Editor } from '../../store/editor/editor.state';

export interface EditorViewService {
  executeKeyboardEventStrategies(event: KeyboardEvent, element: HTMLElement): void;
  executeInputEventStrategies(event: InputEvent, element: HTMLElement): void;
  getWhiteSpaceCSS(file: File, editor: Editor): string;
  setContentWithCurrentSelection(element: HTMLElement, content: string, editor: Editor): void;
}
