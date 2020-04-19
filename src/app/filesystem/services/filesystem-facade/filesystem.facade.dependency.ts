import { DependencyConfigurer } from 'src/app/core/dependency-configurer/dependency-configurer';
import { FilesystemFacade } from './filesystem.facade';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { DefaultFilesystemFacade } from './default-filesystem.facade';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { numberIdGeneratorServiceDep } from 'src/app/core/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/id-generator-service/id-generator.service';


export const filesystemFacadeDep: DependencyConfigurer<FilesystemFacade> = new DependencyConfigurer<FilesystemFacade>({
  tokenDescription: 'FilesystemFacade',
  dependencies: [
    Store,
    filesystemServiceDep.getToken(),
    numberIdGeneratorServiceDep.getToken()
  ],
  factory: (
    store: Store<State>,
    filesystemService: FilesystemService,
    idGeneratorServiceDep: IdGeneratorService
  ) => {
    return new DefaultFilesystemFacade(store, filesystemService, idGeneratorServiceDep);
  }
});