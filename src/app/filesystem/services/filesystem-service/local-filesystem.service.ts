import { Inject, Injectable } from '@angular/core';
import { OpenDialogOptions } from 'electron';
import { IpcChannelName, IpcRequest } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';

import { FilesystemService, LoadDirectoryResult, OpenDialogResult, StatResult } from './filesystem.service';

@Injectable()
export class LocalFilesystemService implements FilesystemService {
  constructor(@Inject(ipcServiceDep.getToken()) private ipcService: IpcService) {}

  public openDialog(options?: OpenDialogOptions): Observable<OpenDialogResult> {
    const request: IpcRequest<OpenDialogOptions> = {
      params: options,
    };
    const response$ = this.ipcService.send<OpenDialogOptions, OpenDialogResult>(IpcChannelName.OPEN_DIALOG, request);
    return response$;
  }

  public loadDirectory(path: string): Observable<LoadDirectoryResult[]> {
    const request: IpcRequest<string> = {
      params: path,
    };
    const response$ = this.ipcService.send<string, LoadDirectoryResult[]>(IpcChannelName.LOAD_DIRECTORY, request);
    return response$;
  }

  public loadFile(path: string): Observable<string> {
    const request: IpcRequest<string> = {
      params: path,
    };
    const response$ = this.ipcService.send<string, string>(IpcChannelName.LOAD_FILE, request);
    return response$;
  }

  public statPath(path: string): Observable<StatResult> {
    const request: IpcRequest<string> = {
      params: path,
    };
    const response$ = this.ipcService.send<string, StatResult>(IpcChannelName.STAT_PATH, request);
    return response$;
  }
}
