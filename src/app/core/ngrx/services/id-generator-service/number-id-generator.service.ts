import { IdGeneratorService } from './id-generator.service';

export class NumberIdGeneratorService implements IdGeneratorService {
  public nextId(usedIds: number[]): number {
    return this.nextNIds(1, usedIds)[0];
  }

  public nextNIds(n: number, usedIds: number[]): number[] {
    const nLowest: number[] = [];
    for (let i = 0; nLowest.length < n; i++) {
      if (usedIds.indexOf(i) === -1) {
        nLowest.push(i);
      }
    }
    return nLowest;
  }
}
