import {IpcMainEvent} from 'electron';

export interface IpcChannel {

  getName(): string;
  handle<ParamType>(event: IpcMainEvent, request: IpcRequest<ParamType>): void;
}

export interface IpcRequest<ParamType> {
  
  responseChannel?: string;
  params?: ParamType;
}