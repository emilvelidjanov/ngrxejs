import { IdGeneratorService } from './id-generator.service';

export class UuidGeneratorService implements IdGeneratorService {
  
  nextId() {
    throw new Error("Method not implemented.");
  }
}