import * as fs from 'fs';
import { bindNodeCallback, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class FsUtils {
  static readDirectory(path: string): Observable<fs.Dirent[]> {
    let options: ReaddirOptions = {
      encoding: 'utf-8',
      withFileTypes: true,
    };
    const readDirectoryCallback = bindNodeCallback<fs.PathLike, any, fs.Dirent[]>(fs.readdir);
    return readDirectoryCallback(path, options).pipe(take(1));
  }

  static readFile(path: string): Observable<string> {
    let options: ReadFileOptions = {
      encoding: 'utf8',
    };
    const readFileCallback = bindNodeCallback<fs.PathLike, any, string>(fs.readFile);
    return readFileCallback(path, options).pipe(take(1));
  }
}

export interface ReaddirOptions {
  encoding: BufferEncoding;
  withFileTypes?: boolean;
}

export interface ReadFileOptions {
  encoding?: string;
  flag?: string;
}
