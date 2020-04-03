import { InjectionToken, Provider } from "@angular/core";
import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './impl/local-filesystem.service';

const filesystemServiceToken: InjectionToken<FilesystemService> = new InjectionToken('FilesystemService');

const filesystemServiceFactory: Function = () => {
  let filesystemService: FilesystemService = new LocalFilesystemService();
  return filesystemService;
};

const filesystemServiceProvider: Provider = {
  provide: filesystemServiceToken,
  useFactory: filesystemServiceFactory,
  deps: []
};

export { filesystemServiceProvider, filesystemServiceToken };