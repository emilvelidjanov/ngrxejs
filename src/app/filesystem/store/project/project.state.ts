import { EntityState } from '@ngrx/entity';
import { Entity } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';


export interface Projects extends EntityState<Project>{
}

export interface Project extends Entity {
  name: string,
  directory: string,
  fileIds: number[],
}

const initialState: Projects = {
  ids: [],
  entities: {},
}
export const projectStoreConfig: StoreConfigurer<Project, Projects> = new StoreConfigurer(
  initialState,
);