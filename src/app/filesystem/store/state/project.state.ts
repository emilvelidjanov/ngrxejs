import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface Projects extends EntityState<Project>{
}

export interface Project {
  id: number,
  name: string,
  directory: string,
  fileIds: number[],
}

export const projectAdapter: EntityAdapter<Project> = createEntityAdapter<Project>();
export const projectsInitialState: Projects = projectAdapter.getInitialState();