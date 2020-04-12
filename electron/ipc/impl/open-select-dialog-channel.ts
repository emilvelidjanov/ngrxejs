import { IpcChannel, IpcRequest } from '../ipc';
import { IpcMainEvent, OpenDialogOptions, dialog, BrowserWindow, OpenDialogReturnValue, app } from 'electron';

export class OpenSelectDialogChannel implements IpcChannel {

  private window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }
  
  getName(): string {
    return 'open-select-dialog'
  }

  handle(event: IpcMainEvent, request: IpcRequest<OpenDialogOptions>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    dialog.showOpenDialog(this.window, request.params)
    .then((value: OpenDialogReturnValue) => {
      event.sender.send(request.responseChannel, value);
    })
    .catch((error: any) => {
      console.error(error);
    });
  }
}