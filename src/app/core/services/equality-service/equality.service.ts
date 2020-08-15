export interface EqualityService {
  shallowEquals(obj1: object, obj2: object): boolean;
  deepEquals(obj1: object, obj2: object): boolean;
}
