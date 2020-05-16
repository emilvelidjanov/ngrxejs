import { Injectable } from '@angular/core';

import { Sort, SortService } from './sort.service';

@Injectable()
export class DefaultSortService implements SortService {
  public sort<Type>(values: Type[], sort: Sort<Type>): Type[] {
    return values.slice().sort((a: Type, b: Type) => {
      let result: number = sort.primarySort(a, b);
      if (!result && sort.secondarySort) {
        result = sort.secondarySort(a, b);
      }
      return result;
    });
  }
}
