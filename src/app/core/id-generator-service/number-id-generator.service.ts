import { IdGeneratorService } from './id-generator.service';

export class NumberIdGeneratorService implements IdGeneratorService {
  
  nextId(usedIds: number[]): number {
    usedIds.sort((a: number, b: number) => a - b);
    let lowest: number = undefined;
    for (let i = 0; i < usedIds.length; i++) {
      if (usedIds[i] !== i) {
        lowest = i;
        break;
      }
    }
    if (lowest === undefined) {
      lowest = usedIds[usedIds.length - 1] + 1;
    }
    return lowest;
  }
}