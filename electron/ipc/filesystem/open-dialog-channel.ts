import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent, OpenDialogOptions, dialog, BrowserWindow, OpenDialogReturnValue } from 'electron';
import { OpenDialogResult } from '../../../src/app/filesystem/services/filesystem-service/filesystem.service';


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
        let response: OpenDialogResult = value;
        event.reply(request.responseChannel, response);
      }).catch((error: any) => {
        console.error(error);
      });
  }
}