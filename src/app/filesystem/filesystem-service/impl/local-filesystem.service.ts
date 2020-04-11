import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem.service';
import { OpenDialogOptions } from "electron";
import { IpcChannel } from 'electron/ipc-channel';
import { ElectronService } from 'src/app/filesystem/electron-service/electron.service';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  debugCounter: number = 0;

  constructor(private electronService: ElectronService) { }

  debug(): void {
    this.debugCounter++;
    console.log(`LocalFilesystemService: #${this.debugCounter}`);
  }

  openSelectDialog(options?: OpenDialogOptions): void {
    if (!options) options = {};
    this.electronService.ipcRenderer.send(IpcChannel.OPEN_SELECT_DIALOG, options);
  }
}
