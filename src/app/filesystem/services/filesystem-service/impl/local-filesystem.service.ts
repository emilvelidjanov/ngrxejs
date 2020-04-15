import { Injectable, Inject } from '@angular/core';
import { FilesystemService, OpenDialogResult } from '../filesystem.service';
import { OpenDialogOptions, OpenDialogReturnValue } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/filesystem/reducers';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    private store: Store<State>,
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService
  ) { }

  openDialog(options?: OpenDialogOptions): Observable<OpenDialogReturnValue> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogReturnValue>(IpcChannelName.OPEN_DIALOG, request); 
  }

  loadDirectoryFromOpenDialogResult(openDialogResult: OpenDialogResult): Observable<string[]> {
    if (!openDialogResult.canceled) {
      let path: string = openDialogResult.filePaths[0];
      return this.loadDirectory(path);
    }
  }

  loadDirectory(path: string): Observable<string[]> {
    let request: IpcRequest<string> = {};
    if (path) request.params = path;
    return this.ipcService.send<string, string[]>(IpcChannelName.LOAD_DIRECTORY, request);
  }
}
