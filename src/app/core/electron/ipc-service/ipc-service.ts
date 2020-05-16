import { IpcRequest } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';

export interface IpcService {
  send<ParamType, ReturnType>(channel: string, request: IpcRequest<ParamType>): Observable<ReturnType>;
}
