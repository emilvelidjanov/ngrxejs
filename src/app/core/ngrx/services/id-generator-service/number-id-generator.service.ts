import { IdGeneratorService } from './id-generator.service';

export class NumberIdGeneratorService implements IdGeneratorService {
  
  nextId(usedIds: number[]): number {
    let sortedUsedIds = usedIds.slice().sort((a: number, b: number) => a - b);
    let lowest: number = undefined;
    for (let i = 0; i < sortedUsedIds.length; i++) {
      if (sortedUsedIds[i] !== i) {
        lowest = i;
        break;
      }
    }
    if (!sortedUsedIds) {
      lowest = 0;
    }
    if (lowest === undefined) {
      lowest = sortedUsedIds[sortedUsedIds.length - 1] + 1;
    }
    return lowest;
  }

  nextNIds(n: number, usedIds: number[]): number[] {
    let sortedUsedIds = usedIds.slice().sort((a: number, b: number) => a - b);
    let nLowest: number[] = [];
    for (let i = 0; i < sortedUsedIds.length; i++) {
      if (sortedUsedIds[i] !== i) {
        nLowest.push(i);
      }
    }
    let max: number = n + sortedUsedIds.length;
    for (let j = sortedUsedIds.length; j < max; j++) {
      nLowest.push(j);
    }
    return nLowest;
  }
}