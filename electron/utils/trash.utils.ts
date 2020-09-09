import { defer, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// What the fuck
// @ts-ignore
import trash = require('trash');

export class TrashUtils {
  static trash(path: string): Observable<void> {
    const trash$ = defer(() => trash(path)).pipe(take(1));
    return trash$;
  }
}
