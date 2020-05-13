import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { FilesystemFacade } from './filesystem.facade';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { DefaultFilesystemFacade } from './default-filesystem.facade';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FileService } from '../file-service/file.service';
import { projectServiceDep } from '../project-service/project.service.dependency';
import { ProjectService } from '../project-service/project.service';


export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [
    filesystemServiceDep.getToken(),
    fileServiceDep.getToken(),
    projectServiceDep.getToken(),
  ],
  factory: (
    filesystemService: FilesystemService,
    fileService: FileService,
    projectService: ProjectService,
  ) => {
    return new DefaultFilesystemFacade(filesystemService, fileService, projectService);
  }
});
