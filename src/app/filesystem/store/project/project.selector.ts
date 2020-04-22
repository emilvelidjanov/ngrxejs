import { projectStoreConfig } from './project.state';
import { selectProjects } from '..';


export const projectSelectors = {
  ...projectStoreConfig.getSelectors(selectProjects),
};