import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { File } from '../../store/file/file.state';
import { Observable } from 'rxjs';


export interface FileService {

  createFiles(loadDirectoryResult: LoadDirectoryResult[]): File[];  //TODO: make observable?
  createFile(loadDirectoryResult: LoadDirectoryResult): File;
  createFiles$(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
}