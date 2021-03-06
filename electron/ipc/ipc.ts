import { IpcMainEvent } from 'electron';

export interface IpcChannel<ParamType> {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest<ParamType>): void;
}

export interface IpcRequest<ParamType> {
  responseChannel?: string;
  params?: ParamType;
}

export enum IpcChannelName {
  OPEN_DIALOG = 'open-dialog',
  LOAD_DIRECTORY = 'load-directory',
  LOAD_FILE = 'load-file',
  STAT_PATH = 'stat-path',
  CREATE_DIRECTORY = 'create-directory',
  CREATE_FILE = 'create-file',
  DELETE_PATH = 'delete-path',
}
