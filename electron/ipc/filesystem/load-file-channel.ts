import { IpcChannel, IpcChannelName, IpcRequest } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from '../../utils/fs.utils';

export class LoadFileChannel implements IpcChannel<string> {
  constructor() {}

  getName(): string {
    return IpcChannelName.LOAD_FILE;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    const path = request.params;
    FsUtils.readFile(path).subscribe((content) => event.reply(request.responseChannel, content), console.error);
  }
}
