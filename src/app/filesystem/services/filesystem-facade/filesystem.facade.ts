import { File } from '../../store/file/file.state';
import { Observable } from 'rxjs';


export interface FilesystemFacade {
  
  openProject(): void;
  openDirectory(file: File): void;
  isOpenedDirectory(file: File): Observable<boolean>;
}