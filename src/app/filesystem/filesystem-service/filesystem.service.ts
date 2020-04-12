import { Observable } from 'rxjs';

export interface FilesystemService {

  openSelectDialog(options?: any): Observable<any>;
}