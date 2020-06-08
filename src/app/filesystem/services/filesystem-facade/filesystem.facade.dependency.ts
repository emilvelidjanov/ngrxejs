import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { projectServiceDep } from '../project-service/project.service.dependency';

import { DefaultFilesystemFacade } from './default-filesystem.facade';
import { FilesystemFacade } from './filesystem.facade';

export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [filesystemServiceDep.getToken(), projectServiceDep.getToken(), directoryServiceDep.getToken()],
  factory: (
    filesystemService: FilesystemService,
    projectService: ProjectService,
    directoryService: DirectoryService,
  ) => {
    return new DefaultFilesystemFacade(filesystemService, projectService, directoryService);
  },
});
