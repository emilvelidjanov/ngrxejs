import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent, OpenDialogOptions, dialog, BrowserWindow, OpenDialogReturnValue } from 'electron';

export class OpenSelectDialogChannel implements IpcChannel {

  private window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }
  
  getName(): string {
    return IpcChannelName.OPEN_SELECT_DIALOG;
  }

  handle(event: IpcMainEvent, request: IpcRequest<OpenDialogOptions>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    dialog.showOpenDialog(this.window, request.params)
    .then((value: OpenDialogReturnValue) => {
      event.reply(request.responseChannel, value);
    })
    .catch((error: any) => {
      console.error(error);
    });
  }
}