import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { FilesystemFacade } from './filesystem.facade';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { DefaultFilesystemFacade } from './default-filesystem.facade';
import { Store } from '@ngrx/store';
import { FilesystemState } from '../../store/reducers';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FileService } from '../file-service/file.service';


export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [
    Store,
    filesystemServiceDep.getToken(),
    fileServiceDep.getToken(),
  ],
  factory: (
    store: Store<FilesystemState>,
    filesystemService: FilesystemService,
    fileService: FileService,
  ) => {
    return new DefaultFilesystemFacade(store, filesystemService, fileService);
  }
});