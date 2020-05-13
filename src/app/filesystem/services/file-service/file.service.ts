import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { File } from '../../store/file/file.state';
import { Observable } from 'rxjs';


export interface FileService {

  createFiles(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
  sortFilesDefault(file: File[]): File[];
  dispatchSetAll(files: File[]): void;
  dispatchLoadedDirectory(directory: File, files: File[]): void;
  dispatchOpenedDirectory(directory: File): void;
  selectIsLoadedDirectory(directory: File): Observable<boolean>;
  selectIsOpenedDirectory(directory: File): Observable<boolean>;
}