export interface IdGeneratorService {

  nextId(...args: any[]): number | string;
  nextNIds(n: number, ...args: any[]): number[] | string[];
}