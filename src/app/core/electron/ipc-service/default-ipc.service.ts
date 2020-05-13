import { Injectable } from '@angular/core';
import { ElectronService } from '../electron-service/electron.service';
import { IpcRenderer, IpcRendererEvent } from 'electron';
import { IpcRequest } from 'electron/ipc/ipc';
import { Observable, fromEvent } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IpcService } from './ipc-service';


@Injectable()
export class DefaultIpcService implements IpcService {

  private ipcRenderer: IpcRenderer;

  constructor(private electronService: ElectronService) { }

  public send<ParamType, ReturnType>(channel: string, request: IpcRequest<ParamType> = {}): Observable<ReturnType> {
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }
    if (!request.responseChannel) {
      const random: number = Math.floor(Math.random() * Math.floor(99999));
      request.responseChannel = `${channel}_response_${new Date().getTime()}_${random}`;
    }
    const ipcRenderer = this.ipcRenderer;
    ipcRenderer.send(channel, request);
    const response$ = fromEvent<[IpcRendererEvent, any]>(ipcRenderer, request.responseChannel).pipe(
      map(([event, response]) => response),
      take(1)
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
