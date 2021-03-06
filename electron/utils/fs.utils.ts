import * as fs from 'fs';
import { bindNodeCallback, Observable, pipe } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { PathUtils } from './path.utils';

export class FsUtils {
  static readDirectory(path: string): Observable<fs.Dirent[]> {
    const options: ReaddirOptions = {
      encoding: 'utf-8',
      withFileTypes: true,
    };
    const readDirectoryCallback = bindNodeCallback<fs.PathLike, object, fs.Dirent[]>(fs.readdir);
    return readDirectoryCallback(path, options).pipe(take(1));
  }

  static readFile(path: string): Observable<string> {
    const options: ReadFileOptions = {
      encoding: 'utf8',
    };
    const readFileCallback = bindNodeCallback<fs.PathLike, object, string>(fs.readFile);
    return readFileCallback(path, options).pipe(take(1));
  }

  static statPath(path: string): Observable<fs.Stats> {
    const options: StatOptions = {
      bigint: false,
    };
    const statPathCallback = bindNodeCallback<fs.PathLike, object, fs.Stats>(fs.stat);
    return statPathCallback(path, options).pipe(take(1));
  }

  static makeDir(path: string, name: string): Observable<void> {
    const options: MakeDirOptions = {
      recursive: false,
    };
    const makeDirCallback = bindNodeCallback<fs.PathLike, object, void>(fs.mkdir);
    return makeDirCallback(PathUtils.joinPath(path, name), options).pipe(take(1));
  }

  static makeFile(path: string, name: string): Observable<void> {
    const joinedPath = PathUtils.joinPath(path, name);
    const openFileCallback = bindNodeCallback<fs.PathLike, string, number>(fs.open);
    const closeFileCallback = bindNodeCallback(fs.close);
    return openFileCallback(joinedPath, 'wx').pipe(
      switchMap((fd) => closeFileCallback(fd)),
      pipe(take(1)),
    );
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

export interface StatOptions {
  bigint: boolean;
}

export interface MakeDirOptions {
  recursive?: boolean;
  mode?: string;
}
