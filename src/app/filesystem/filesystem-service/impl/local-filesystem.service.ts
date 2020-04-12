import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem.service';
import { OpenDialogOptions, OpenDialogReturnValue } from "electron";
import { IpcService } from '../../ipc-service/ipc.service';
import { IpcRequest } from 'electron/ipc/ipc';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  debugCounter: number = 0;

  constructor(private ipcService: IpcService) { }

  debug(): void {
    this.debugCounter++;
    console.log(`LocalFilesystemService: #${this.debugCounter}`);
  }

  async openSelectDialog(options?: OpenDialogOptions): Promise<OpenDialogReturnValue> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    const t = await this.ipcService.send<OpenDialogOptions, OpenDialogReturnValue>('open-select-dialog', request);  //TODO: enum for channel string??
    console.log("Result:", t);
    return t;
  }
}
