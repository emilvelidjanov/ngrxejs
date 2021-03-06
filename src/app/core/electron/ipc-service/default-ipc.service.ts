import { Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from 'electron';
import { IpcRequest } from 'electron/ipc/ipc';
import { fromEvent, Observable } from 'rxjs';
import { map, share, take } from 'rxjs/operators';

import { ElectronService } from '../electron-service/electron.service';

import { IpcService } from './ipc-service';

@Injectable()
export class DefaultIpcService implements IpcService {
  private ipcRenderer: IpcRenderer;

  constructor(private electronService: ElectronService) {}

  public send<ParamType, ReturnType>(channel: string, request: IpcRequest<ParamType> = {}): Observable<ReturnType> {
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }
    if (!request.responseChannel) {
      const random = Math.floor(Math.random() * 99999);
      request.responseChannel = `${channel}_response_${new Date().getTime()}_${random}`;
    }
    const ipcRenderer = this.ipcRenderer;
    ipcRenderer.send(channel, request);
    const response$ = fromEvent<[IpcRendererEvent, any]>(ipcRenderer, request.responseChannel).pipe(
      map(([_event, response]) => response),
      take(1),
      share(),
    );
    return response$;
  }

  private initializeIpcRenderer() {
    if (!this.electronService.isElectron()) {
      throw new Error('Unable to initialize IpcRenderer.');
    }
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }
}
