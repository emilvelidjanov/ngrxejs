import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';


@Injectable()
export class ElectronService {
  ipcRenderer: IpcRenderer;

  constructor() {
    if (this.isElectron()) {
      let electron: typeof Electron = window.require('electron');
      this.ipcRenderer = electron.ipcRenderer;
    }
  }

  public isElectron() {
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }
    return false;
  }
}