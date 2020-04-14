import { DependencyConfigurer } from 'src/app/core/dependency-configurer/dependency-configurer';
import { FilesystemFacade } from './filesystem.facade';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { DefaultFilesystemFacade } from './impl/default-filesystem.facade';


export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [filesystemServiceDep.getToken()],
  factory: (filesystemService: FilesystemService) => {
    return new DefaultFilesystemFacade(filesystemService);
  }
});