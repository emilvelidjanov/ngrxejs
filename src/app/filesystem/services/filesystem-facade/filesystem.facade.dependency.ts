import { DependencyConfigurer } from 'src/app/core/dependency-configurer/dependency-configurer';
import { FilesystemFacade } from './filesystem.facade';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { DefaultFilesystemFacade } from './impl/default-filesystem.facade';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';


export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [Store, filesystemServiceDep.getToken()],
  factory: (store: Store<State>, filesystemService: FilesystemService) => {
    return new DefaultFilesystemFacade(store, filesystemService);
  }
});