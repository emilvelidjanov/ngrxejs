import * as fs from 'fs';
import { bindNodeCallback, Observable } from 'rxjs';
import { take } from 'rxjs/operators';


export class FsUtils {

  static readDirectory(directory: string): Observable<fs.Dirent[]> {
    let options: ReaddirOptions = {
      encoding: "utf-8",
      withFileTypes: true,
    };
    const readDirectoryObservable = bindNodeCallback<fs.PathLike, any, fs.Dirent[]>(fs.readdir);
    return readDirectoryObservable(directory, options).pipe(take(1));
  }
}

export interface ReaddirOptions {
  encoding: BufferEncoding,
  withFileTypes?: boolean
}