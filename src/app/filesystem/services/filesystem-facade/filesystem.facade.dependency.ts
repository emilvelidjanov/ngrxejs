import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { projectServiceDep } from '../project-service/project.service.dependency';

import { DefaultFilesystemFacade } from './default-filesystem.facade';
import { FilesystemFacade } from './filesystem.facade';

export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [filesystemServiceDep.getToken(), fileServiceDep.getToken(), projectServiceDep.getToken()],
  factory: (filesystemService: FilesystemService, fileService: FileService, projectService: ProjectService) => {
    return new DefaultFilesystemFacade(filesystemService, fileService, projectService);
  },
});
