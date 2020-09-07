import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';

export class DeleteFileChannel implements IpcChannel<string> {
  constructor() {}

  public getName(): string {
    return IpcChannelName.DELETE_FILE;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    const path = request.params;
    console.log(path);
    event.reply(request.responseChannel, null);
  }
}
