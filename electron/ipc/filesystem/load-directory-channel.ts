import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from '../../utils/fs.utils';
import { Dirent } from 'fs';
import { PathUtils } from '../../utils/path.utils';
import { LoadDirectoryResult } from './../../../src/app/filesystem/services/filesystem-service/filesystem.service';

export class LoadDirectoryChannel implements IpcChannel<string> {
  constructor() {}

  getName(): string {
    return IpcChannelName.LOAD_DIRECTORY;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    let path: string = request.params;
    FsUtils.readDirectory(path).subscribe(
      (files: Dirent[]) => {
        let response: LoadDirectoryResult[] = files.map((file: Dirent) => this.toResponse(file, path));
        event.reply(request.responseChannel, response);
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  private toResponse(file: Dirent, path: string): LoadDirectoryResult {
    let fullPath: string = PathUtils.joinPath(path, file.name);
    let extension: string = PathUtils.getExtension(fullPath);
    let name: string = PathUtils.getFilename(file.name);
    return {
      name: name,
      path: fullPath,
      extension: extension,
      isDirectory: file.isDirectory(),
    };
  }
}
