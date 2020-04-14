import { Injectable, Inject } from '@angular/core';
import { FilesystemService, SelectDialogResult } from '../filesystem.service';
import { OpenDialogOptions, OpenDialogReturnValue } from "electron";
import { IpcRequest, IpcChannelName } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/filesystem/reducers';
import { setLoadedDirectory } from 'src/app/filesystem/actions/file-tree.actions';


@Injectable()
export class LocalFilesystemService implements FilesystemService {

  constructor(
    private store: Store<State>,
    @Inject(ipcServiceDep.getToken()) private ipcService: IpcService
  ) { }

  openSelectDialog(options?: OpenDialogOptions): Observable<OpenDialogReturnValue> {
    let request: IpcRequest<OpenDialogOptions> = {};
    if (options) request.params = options;
    return this.ipcService.send<OpenDialogOptions, OpenDialogReturnValue>(IpcChannelName.OPEN_SELECT_DIALOG, request); 
  }

  setLoadedDirectory(selectDialogResult: SelectDialogResult): void {
    if (!selectDialogResult.canceled) {
      let path: string = selectDialogResult.filePaths[0];
      this.store.dispatch(setLoadedDirectory({
        loadedDirectory: path
      }));
    }
  }
}
