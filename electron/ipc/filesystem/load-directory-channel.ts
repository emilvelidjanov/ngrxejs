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
    const path = request.params;
    FsUtils.readDirectory(path).subscribe((files) => {
      const response = files.map((file) => this.toResponse(file, path));
      event.reply(request.responseChannel, response);
    }, console.error);
  }

  private toResponse(file: Dirent, path: string): LoadDirectoryResult {
    const fullPath = PathUtils.joinPath(path, file.name);
    const extension = PathUtils.getExtension(fullPath);
    const name = PathUtils.getFilename(file.name);
    return {
      name: name,
      path: fullPath,
      extension: extension,
      isDirectory: file.isDirectory(),
    };
  }
}
