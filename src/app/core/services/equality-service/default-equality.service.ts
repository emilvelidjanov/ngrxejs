import { Injectable } from '@angular/core';

import { EqualityService } from './equality.service';

@Injectable()
export class DefaultEqualityService implements EqualityService {
  public shallowEquals(obj1: object, obj2: object): boolean {
    if (obj1 && obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    } else if (!obj1 && !obj2) {
      return obj1 === obj2;
    } else {
      return false;
    }
  }

  public deepEquals(obj1: object, obj2: object): boolean {
    if (obj1 && obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = this.isObject(val1) && this.isObject(val2);
        if ((areObjects && !this.deepEquals(val1, val2)) || (!areObjects && val1 !== val2)) {
          return false;
        }
      }
      return true;
    } else if (!obj1 && !obj2) {
      return obj1 === obj2;
    } else {
      return false;
    }
  }

  private isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
  }
}
