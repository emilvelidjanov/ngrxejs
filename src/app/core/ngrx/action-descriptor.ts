import { PropId, PropIds } from './entity/entity-domain-state/props';

export interface ActionDescriptor {
  type: string;
  props?: Partial<PropId> | Partial<PropIds>;
}
