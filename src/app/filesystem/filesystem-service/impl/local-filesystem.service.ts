import { Injectable, Inject } from '@angular/core';
import { FilesystemService } from '../filesystem.service';
import { OpenDialogOptions, OpenDialogReturnValue } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService
  ) { }

  openSelectDialog(options?: OpenDialogOptions): Observable<OpenDialogReturnValue> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogReturnValue>(IpcChannelName.OPEN_SELECT_DIALOG, request); 
  }
}
