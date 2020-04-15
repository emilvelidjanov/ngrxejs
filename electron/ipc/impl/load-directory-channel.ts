import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from './../../utils/fs.utils';


export class LoadDirectoryChannel implements IpcChannel<string> {

  constructor() { }

  getName(): string {
    return IpcChannelName.LOAD_DIRECTORY;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    let path: string = request.params;
    FsUtils.readDirectory(path).subscribe((files: string[]) => {  //TODO: manage subscription?
      event.reply(request.responseChannel, files);
    }, (error: any) => {
      console.log(error);
    });
  }
}