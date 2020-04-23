import { IdGeneratorService } from './id-generator.service';


export class UuidGeneratorService implements IdGeneratorService {
  
  nextId(): string {
    throw new Error("Method not implemented.");
  }

  nextNIds(n: number): string[] {
    throw new Error("Method not implemented.");
  }
}