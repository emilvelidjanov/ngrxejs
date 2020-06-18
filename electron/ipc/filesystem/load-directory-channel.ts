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
    const path: string = request.params;
    FsUtils.readDirectory(path).subscribe(
      (files: Dirent[]) => {
        const response: LoadDirectoryResult[] = files.map((file: Dirent) => this.toResponse(file, path));
        event.reply(request.responseChannel, response);
      },
      (error: any) => console.error(error),
    );
  }

  private toResponse(file: Dirent, path: string): LoadDirectoryResult {
    const fullPath: string = PathUtils.joinPath(path, file.name);
    const extension: string = PathUtils.getExtension(fullPath);
    const name: string = PathUtils.getFilename(file.name);
    return {
      name: name,
      path: fullPath,
      extension: extension,
      isDirectory: file.isDirectory(),
    };
  }
}
