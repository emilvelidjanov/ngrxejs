import { Directory } from '../../store/directory/directory.state';

export interface FilesystemFacade {
  openProject(): void;
  openDirectory(directory: Directory): void;
}
