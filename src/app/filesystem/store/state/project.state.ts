import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Entity } from 'src/app/core/ngrx/entity';


export interface Projects extends EntityState<Project>{
}

export interface Project extends Entity {
  name: string,
  directory: string,
  fileIds: number[],
}

export const projectAdapter: EntityAdapter<Project> = createEntityAdapter<Project>();
export const projectsInitialState: Projects = projectAdapter.getInitialState();