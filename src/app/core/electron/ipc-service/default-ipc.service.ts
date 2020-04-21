import { Injectable } from '@angular/core';
import { ElectronService } from '../electron-service/electron.service';
import { IpcRenderer } from 'electron';
import { IpcRequest } from 'electron/ipc/ipc';
import { Observable, fromEvent } from 'rxjs';
import { map } from "rxjs/operators";
import { IpcService } from './ipc-service';


@Injectable()
export class DefaultIpcService implements IpcService {

  private ipcRenderer?: IpcRenderer;

  constructor(private electronService: ElectronService) { }

  public send<ParamType, ReturnType>(channel: string, request: IpcRequest<ParamType> = {}): Observable<ReturnType> {
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }
    if (!request.responseChannel) {
      request.responseChannel = `${channel}_response_${new Date().getTime()}`;
    }
    const ipcRenderer = this.ipcRenderer;
    ipcRenderer.send(channel, request);
    return fromEvent<any[]>(ipcRenderer, request.responseChannel)
    .pipe(map((value: any[]) => value[1]));
  }

  private initializeIpcRenderer() {
    if (!this.electronService.isElectron()) {
      throw new Error("Unable to initialize IpcRenderer.");
    }
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }
}
