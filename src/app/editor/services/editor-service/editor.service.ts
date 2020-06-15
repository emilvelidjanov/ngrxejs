import { File } from 'src/app/filesystem/store/file/file.state';

export interface EditorService {
  dispatchToggleOpenedFile(file: File): void;
  dispatchFocusedFile(file: File): void;
  selectIsOpenedFile(file: File): void;
  dispatchOpenedFile(file: File): void;
}
