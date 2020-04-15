import * as fs from 'fs';
import { bindNodeCallback, Observable } from 'rxjs';


export class FsUtils {

  static readDirectory(directory: string): Observable<string[]> {
    const readDirectoryObservable = bindNodeCallback<fs.PathLike, string[]>(fs.readdir);
    return readDirectoryObservable(directory);
  }
}