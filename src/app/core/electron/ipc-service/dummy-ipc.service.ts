import { Injectable } from '@angular/core';
import { IpcRequest } from 'electron/ipc/ipc';
import { Observable } from 'rxjs';

import { IpcService } from './ipc-service';

@Injectable()
export class DummyIpcService implements IpcService {
  constructor() {}

  public send<ParamType, ReturnType>(_channel: string, _request: IpcRequest<ParamType> = {}): Observable<ReturnType> {
    throw new Error('DummyIpcService#send is dummy method. Do not call.');
  }
}
