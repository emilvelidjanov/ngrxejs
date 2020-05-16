export interface SortService {
  sort<Type>(values: Type[], sort: Sort<Type>): Type[];
}

export type SortFunction<Type> = (a: Type, b: Type) => number;
export interface Sort<Type> {
  primarySort: SortFunction<Type>;
  secondarySort?: SortFunction<Type>;
}
