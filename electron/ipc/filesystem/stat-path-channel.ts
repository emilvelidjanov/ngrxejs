import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from '../../utils/fs.utils';
import { PathUtils } from '../../utils/path.utils';
import { StatResult } from '../../../src/app/filesystem/services/filesystem-service/filesystem.service';

export class StatPathChannel implements IpcChannel<string> {
  constructor() {}

  public getName(): string {
    return IpcChannelName.STAT_PATH;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    const path = request.params;
    FsUtils.statPath(path).subscribe((stats) => {
      const name = PathUtils.getFilename(path);
      const extension = PathUtils.getExtension(path);
      const response: StatResult = {
        name: name,
        path: path,
        extension: extension,
        isDirectory: stats.isDirectory(),
      };
      event.reply(request.responseChannel, response);
    }, console.error);
  }
}
