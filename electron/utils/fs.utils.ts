import * as fs from 'fs';
import { bindNodeCallback, Observable } from 'rxjs';
import { first } from 'rxjs/operators';


export class FsUtils {

  static readDirectory(directory: string): Observable<fs.Dirent[]> {
    let options: {encoding: BufferEncoding, withFileTypes?: boolean} = {
      encoding: "utf-8",
      withFileTypes: true,
    };
    const readDirectoryObservable = bindNodeCallback<fs.PathLike, any, fs.Dirent[]>(fs.readdir);
    return readDirectoryObservable(directory, options).pipe(first());
  }
}