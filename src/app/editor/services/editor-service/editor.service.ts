import { File } from 'src/app/filesystem/store/file/file.state';

export interface EditorService {
  dispatchToggleOpenedFile(file: File): void;
  dispatchFocusedFile(file: File): void;
  dispatchUnfocusedFile(file: File): void;
  dispatchClosedFile(file: File): void;
}
