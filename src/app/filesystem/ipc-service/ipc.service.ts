import { Injectable } from '@angular/core';
import { ElectronService } from '../electron-service/electron.service';
import { IpcRenderer } from 'electron';
import { IpcRequest } from 'electron/ipc/ipc';


@Injectable()
export class IpcService {

  private ipcr?: IpcRenderer;

  constructor(private electronService: ElectronService) { }

  //TODO: Promise to Observable
  public send<ParamType, ReturnType>(channel: string, request: IpcRequest<ParamType> = {}): Promise<ReturnType> {
    if (!this.ipcr) {
      this.initializeIpcRenderer();
    }
    if (!request.responseChannel) {
      request.responseChannel = `${channel}_response_${new Date().getTime()}`
    }
    const icpr = this.ipcr;
    icpr.send(channel, request);
    return (new Promise(resolve => {
      icpr.once(request.responseChannel, (_event, response) => resolve(response));
    }));
  }

  private initializeIpcRenderer() {
    if (!this.electronService.isElectron()) {
      throw new Error("Unable to initialize IpcRenderer.");
    }
    this.ipcr = window.require('electron').ipcRenderer;
  }
}
