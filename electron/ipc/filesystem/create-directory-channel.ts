import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { PathAndName, StatResult } from '../../../src/app/filesystem/services/filesystem-service/filesystem.service';
import { FsUtils } from '../../../electron/utils/fs.utils';
import { PathUtils } from '../../../electron/utils/path.utils';

export class CreateDirectoryChannel implements IpcChannel<PathAndName> {
  constructor() {}

  public getName(): string {
    return IpcChannelName.CREATE_DIRECTORY;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<PathAndName>): void {
    const path = request.params.path;
    const name = request.params.name;
    FsUtils.makeDir(path, name).subscribe(
      null,
      (error) => {
        console.error(error);
        event.reply(request.responseChannel, null);
      },
      () => {
        const response: StatResult = {
          name: name,
          path: PathUtils.joinPath(path, name),
          extension: null,
          isDirectory: true,
        };
        event.reply(request.responseChannel, response);
      },
    );
  }
}
