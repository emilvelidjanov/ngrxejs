import { Id } from '../../entity-configurer/entity';

export interface IdGeneratorService {
  nextId(...args: any[]): Id;
  nextNIds(n: number, ...args: any[]): Id[];
}
