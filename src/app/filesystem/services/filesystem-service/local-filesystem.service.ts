import { Injectable, Inject } from '@angular/core';
import { FilesystemService, OpenDialogResult } from './filesystem.service';
import { OpenDialogOptions } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { first } from 'rxjs/operators';
import { File } from '../../store/state/file.state';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService
  ) { }

  openDialog(options?: OpenDialogOptions): Observable<OpenDialogResult> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogResult>(IpcChannelName.OPEN_DIALOG, request).pipe(first()); 
  }

  loadDirectory(path: string): Observable<File[]> {
    let request: IpcRequest<string> = {};
    if (path) request.params = path;
    return this.ipcService.send<string, File[]>(IpcChannelName.LOAD_DIRECTORY, request).pipe(first());
  }
}
