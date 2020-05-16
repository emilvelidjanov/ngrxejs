import { IdGeneratorService } from './id-generator.service';

export class NumberIdGeneratorService implements IdGeneratorService {
  public nextId(usedIds: number[]): number {
    const sortedUsedIds = usedIds.slice().sort((a: number, b: number) => a - b);
    let lowest: number;
    for (let i = 0; i < sortedUsedIds.length; i++) {
      if (sortedUsedIds[i] !== i) {
        lowest = i;
        break;
      }
    }
    if (!sortedUsedIds.length) {
      lowest = 0;
    }
    if (lowest === undefined) {
      lowest = sortedUsedIds[sortedUsedIds.length - 1] + 1;
    }
    return lowest;
  }

  public nextNIds(n: number, usedIds: number[]): number[] {
    const sortedUsedIds = usedIds.slice().sort((a: number, b: number) => a - b);
    const nLowest: number[] = [];
    for (let i = 0; i < sortedUsedIds.length; i++) {
      if (sortedUsedIds[i] !== i) {
        nLowest.push(i);
      }
    }
    const max: number = n + sortedUsedIds.length;
    for (let j = sortedUsedIds.length; j < max; j++) {
      nLowest.push(j);
    }
    return nLowest;
  }
}
