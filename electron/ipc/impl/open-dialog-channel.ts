import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent, OpenDialogOptions, dialog, BrowserWindow, OpenDialogReturnValue } from 'electron';


export class OpenDialogChannel implements IpcChannel<OpenDialogOptions> {

  private window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }

  getName(): string {
    return IpcChannelName.OPEN_DIALOG;
  }

  handle(event: IpcMainEvent, request: IpcRequest<OpenDialogOptions>): void {
    dialog.showOpenDialog(this.window, request.params)
      .then((value: OpenDialogReturnValue) => {
        event.reply(request.responseChannel, value);
      }).catch((error: any) => {
        console.error(error);
      });
  }
}