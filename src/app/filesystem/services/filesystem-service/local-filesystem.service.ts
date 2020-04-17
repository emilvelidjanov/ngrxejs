import { Injectable, Inject } from '@angular/core';
import { FilesystemService, OpenDialogResult } from './filesystem.service';
import { OpenDialogOptions } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { first } from 'rxjs/operators';
import { FileItemState } from 'src/app/filesystem/store/state/file-item.state';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService
  ) { }

  openDialog(options?: OpenDialogOptions): Observable<OpenDialogResult> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogResult>(IpcChannelName.OPEN_DIALOG, request)
    .pipe(
      first()
    ); 
  }

  loadDirectoryFromOpenDialogResult(openDialogResult: OpenDialogResult): Observable<FileItemState[]> {
    if (!openDialogResult.canceled) {
      let path: string = openDialogResult.filePaths[0];
      return this.loadDirectory(path);
    }
  }

  loadDirectory(path: string): Observable<FileItemState[]> {
    let request: IpcRequest<string> = {};
    if (path) request.params = path;
    return this.ipcService.send<string, FileItemState[]>(IpcChannelName.LOAD_DIRECTORY, request)
    .pipe(
      first()
    );
  }
}
