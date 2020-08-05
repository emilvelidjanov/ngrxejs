import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from '../../utils/fs.utils';
import { PathUtils } from '../../utils/path.utils';
import { LoadDirectoryResult } from './../../../src/app/filesystem/services/filesystem-service/filesystem.service';

export class LoadDirectoryChannel implements IpcChannel<string> {
  constructor() {}

  public getName(): string {
    return IpcChannelName.LOAD_DIRECTORY;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    const path = request.params;
    FsUtils.readDirectory(path).subscribe((dirents) => {
      const response = dirents.map((dirent) => {
        const fullPath = PathUtils.joinPath(path, dirent.name);
        const extension = PathUtils.getExtension(dirent.name);
        const name = PathUtils.getFilename(dirent.name);
        const result: LoadDirectoryResult = {
          name: name,
          path: fullPath,
          extension: extension.length ? extension : null,
          isDirectory: dirent.isDirectory(),
        };
        return result;
      });
      event.reply(request.responseChannel, response);
    }, console.error);
  }
}
