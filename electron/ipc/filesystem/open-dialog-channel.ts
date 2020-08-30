import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent, OpenDialogOptions, dialog, BrowserWindow } from 'electron';
import { OpenDialogResult } from '../../../src/app/filesystem/services/filesystem-service/filesystem.service';
import { PathUtils } from '../../utils/path.utils';

export class OpenDialogChannel implements IpcChannel<OpenDialogOptions> {
  private readonly window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }

  public getName(): string {
    return IpcChannelName.OPEN_DIALOG;
  }

  public handle(event: IpcMainEvent, request: IpcRequest<OpenDialogOptions>): void {
    dialog
      .showOpenDialog(this.window, request.params)
      .then((value) => {
        const names = value.filePaths.map(PathUtils.getFilename);
        const response: OpenDialogResult = {
          paths: value.filePaths,
          names: names,
          canceled: value.canceled,
        };
        event.reply(request.responseChannel, response);
      })
      .catch(console.error);
  }
}
