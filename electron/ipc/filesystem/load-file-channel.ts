import { IpcChannel, IpcChannelName, IpcRequest } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from '../../utils/fs.utils';

export class LoadFileChannel implements IpcChannel<string> {
  constructor() {}

  getName(): string {
    return IpcChannelName.LOAD_FILE;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    let path: string = request.params;
    FsUtils.readFile(path).subscribe(
      (content: string) => {
        event.reply(request.responseChannel, content);
      },
      (error: any) => console.error(error),
    );
  }
}
