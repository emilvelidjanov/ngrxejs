import { InjectionToken, Provider } from "@angular/core";
import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './impl/local-filesystem.service';

const filesystemServiceToken: InjectionToken<FilesystemService> = new InjectionToken('FilesystemService');

const filesystemServiceFactory: () => FilesystemService = () => {
    return new LocalFilesystemService();
};

const filesystemServiceProvider: Provider = {
    provide: filesystemServiceToken,
    useFactory: filesystemServiceFactory
};

export { filesystemServiceProvider, filesystemServiceToken };