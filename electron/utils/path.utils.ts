import * as nodePath from 'path';

export class PathUtils {
  static joinPath(...args: string[]): string {
    return nodePath.join(...args);
  }

  static getExtension(path: string): string {
    return nodePath.extname(path);
  }

  static getFilename(path: string): string {
    return nodePath.basename(path, nodePath.extname(path));
  }
}
