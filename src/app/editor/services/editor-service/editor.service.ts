import { File } from 'src/app/filesystem/store/file/file.state';

export interface EditorService {
  open(file: File): void;
  focus(file: File): void;
  unfocus(file: File): void;
  close(file: File): void;
}
