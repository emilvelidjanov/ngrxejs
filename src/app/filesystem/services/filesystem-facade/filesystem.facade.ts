import { File } from '../../store/file/file.state';


export interface FilesystemFacade {

  openProject(): void;
  openDirectory(file: File): void;
}
