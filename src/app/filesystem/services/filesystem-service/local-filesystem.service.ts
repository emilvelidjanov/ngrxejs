import { Injectable, Inject } from '@angular/core';
import { FilesystemService, OpenDialogResult, LoadDirectoryResult } from './filesystem.service';
import { OpenDialogOptions } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { take } from 'rxjs/operators';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService
  ) { }

  openDialog(options?: OpenDialogOptions): Observable<OpenDialogResult> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogResult>(IpcChannelName.OPEN_DIALOG, request)
    .pipe(take(1)); 
  }

  loadDirectory(path: string): Observable<LoadDirectoryResult[]> {
    let request: IpcRequest<string> = {};
    if (path) request.params = path;
    return this.ipcService.send<string, LoadDirectoryResult[]>(IpcChannelName.LOAD_DIRECTORY, request)
    .pipe(take(1));
  }
}
