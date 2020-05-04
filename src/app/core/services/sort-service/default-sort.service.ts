import { SortService, Sort } from './sort.service';
import { Injectable } from '@angular/core';


@Injectable()
export class DefaultSortService implements SortService {

  sort<Type>(values: Type[], sort: Sort<Type>): Type[] {
    return values.slice().sort((a: Type, b: Type) => {
      let result: number = sort.primarySort(a, b);
      if (!result && sort.secondarySort) {
        result = sort.secondarySort(a, b);
      };
      return result;
    });
  }
}