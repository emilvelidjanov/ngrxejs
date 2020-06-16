import { File } from 'src/app/filesystem/store/file/file.state';

export interface EditorFacade {
  openFile(file: File): void;
  closeFile(file: File): void;
}
