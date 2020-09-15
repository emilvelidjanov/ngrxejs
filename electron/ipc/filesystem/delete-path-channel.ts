import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { TrashUtils } from '../../utils/trash.utils';

export class DeletePathChannel implements IpcChannel<string> {
  constructor() {}

  public getName(): string {
    return IpcChannelName.DELETE_PATH;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    const path = request.params;
    TrashUtils.trash(path).subscribe(() => event.reply(request.responseChannel, null), console.error);
  }
}
