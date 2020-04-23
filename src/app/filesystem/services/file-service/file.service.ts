import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { File } from '../../store/file/file.state';

export interface FileService {

  createFiles(loadDirectoryResult: LoadDirectoryResult[]): File[];
  createFile(loadDirectoryResult: LoadDirectoryResult): File;
}