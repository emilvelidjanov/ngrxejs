import * as path from "path";


export class PathUtils {

  static joinPath(...args: string[]) {
    return path.join(...args);
  }
}