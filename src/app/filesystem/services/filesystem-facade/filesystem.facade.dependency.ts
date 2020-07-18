import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { DirectoryItemService } from '../directory-item-service/directory.service';
import { directoryItemServiceDep } from '../directory-item-service/directory.service.dependency';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
import { FileItemService } from '../file-item-service/file-item.service';
import { fileItemServiceDep } from '../file-item-service/file-item.service.dependency';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { projectServiceDep } from '../project-service/project.service.dependency';
import { ProjectTreeService } from '../project-tree-service/project.service';
import { projectTreeServiceDep } from '../project-tree-service/project.service.dependency';

import { DefaultFilesystemFacade } from './default-filesystem.facade';
import { FilesystemFacade } from './filesystem.facade';

export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [
    filesystemServiceDep.getToken(),
    projectServiceDep.getToken(),
    projectTreeServiceDep.getToken(),
    directoryServiceDep.getToken(),
    directoryItemServiceDep.getToken(),
    fileServiceDep.getToken(),
    fileItemServiceDep.getToken(),
  ],
  factory: (
    filesystemService: FilesystemService,
    projectService: ProjectService,
    projectTreeService: ProjectTreeService,
    directoryService: DirectoryService,
    directoryItemService: DirectoryItemService,
    fileService: FileService,
    fileItemService: FileItemService,
  ) => {
    return new DefaultFilesystemFacade(
      filesystemService,
      projectService,
      projectTreeService,
      directoryService,
      directoryItemService,
      fileService,
      fileItemService,
    );
  },
});
