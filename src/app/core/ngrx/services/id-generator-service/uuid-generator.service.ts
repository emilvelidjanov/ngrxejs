import { v4 } from 'uuid';

import { IdGeneratorService } from './id-generator.service';

export class UuidGeneratorService implements IdGeneratorService {
  constructor() {}

  public nextId(): string {
    return v4();
  }

  public nextNIds(n: number): string[] {
    const uuids: string[] = [];
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        uuids.push(this.nextId());
      }
    }
    return uuids;
  }
}
