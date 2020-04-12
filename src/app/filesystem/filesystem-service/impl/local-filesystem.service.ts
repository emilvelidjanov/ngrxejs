import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem.service';
import { OpenDialogOptions, OpenDialogReturnValue } from "electron";
import { IpcService } from '../../ipc-service/ipc.service';
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(private ipcService: IpcService) { }

  openSelectDialog(options?: OpenDialogOptions): Observable<OpenDialogReturnValue> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogReturnValue>(IpcChannelName.OPEN_SELECT_DIALOG, request); 
  }
}
