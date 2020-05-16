import { IdGeneratorService } from './id-generator.service';

export class UuidGeneratorService implements IdGeneratorService {
  public nextId(): string {
    throw new Error('Method not implemented.');
  }

  public nextNIds(n: number): string[] {
    throw new Error('Method not implemented.');
  }
}
