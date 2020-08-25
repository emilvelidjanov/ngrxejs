import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { PathAndName, StatResult } from '../../../src/app/filesystem/services/filesystem-service/filesystem.service';
import { FsUtils } from '../../../electron/utils/fs.utils';
import { PathUtils } from '../../../electron/utils/path.utils';

export class CreateFileChannel implements IpcChannel<PathAndName> {
  constructor() {}

  public getName(): string {
    return IpcChannelName.CREATE_FILE;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<PathAndName>): void {
    const path = request.params.path;
    const name = request.params.name;
    FsUtils.makeFile(path, name).subscribe(
      () => {
        const responsePath = PathUtils.joinPath(path, name);
        const responseName = PathUtils.getFilename(responsePath);
        const extension = PathUtils.getExtension(name);
        const response: StatResult = {
          name: responseName,
          path: responsePath,
          extension: extension,
          isDirectory: false,
        };
        event.reply(request.responseChannel, response);
      },
      (error) => {
        console.error(error);
        event.reply(request.responseChannel, null);
      },
    );
  }
}
