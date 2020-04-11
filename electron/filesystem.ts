import { IpcChannel } from "./ipc-channel";
import { ipcMain, dialog, OpenDialogOptions, IpcMainEvent } from "electron";
import { mainWindow } from './window';

export function registerIpcEvents() {
  ipcMain.on(IpcChannel.OPEN_SELECT_DIALOG, (event: IpcMainEvent, options?: OpenDialogOptions) => {
    dialog.showOpenDialog(mainWindow, options);
  });
}