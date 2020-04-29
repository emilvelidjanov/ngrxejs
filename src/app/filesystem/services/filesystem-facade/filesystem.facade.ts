import { File } from '../../store/file/file.state';


export interface FilesystemFacade {
  
  openProject(): void;
  loadDirectory(file: File): void;
}