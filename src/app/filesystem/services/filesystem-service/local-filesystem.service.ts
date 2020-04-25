import { Injectable, Inject } from '@angular/core';
import { FilesystemService, OpenDialogResult, LoadDirectoryResult } from './filesystem.service';
import { OpenDialogOptions } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable, of } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { take } from 'rxjs/operators';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService,
  ) { }

  openDialog(options?: OpenDialogOptions): Observable<OpenDialogResult> {
    let request: IpcRequest<OpenDialogOptions> = {
      params: options,
    };
    let response$ = this.ipcService.send<OpenDialogOptions, OpenDialogResult>(IpcChannelName.OPEN_DIALOG, request);
    return response$.pipe(take(1));
  }

  loadDirectory(path: string): Observable<LoadDirectoryResult[]> {
    let request: IpcRequest<string> = {
      params: path
    };
    let response$ = this.ipcService.send<string, LoadDirectoryResult[]>(IpcChannelName.LOAD_DIRECTORY, request);
    return response$.pipe(take(1));
  }
}

