import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from '../../utils/fs.utils';
import { Dirent } from 'fs';
import { PathUtils } from '../../utils/path.utils';
import { File } from './../../../src/app/filesystem/store/state/file.state';


export class LoadDirectoryChannel implements IpcChannel<string> {

  constructor() { }

  getName(): string {
    return IpcChannelName.LOAD_DIRECTORY;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    let path: string = request.params;
    FsUtils.readDirectory(path).subscribe((files: Dirent[]) => {
      let response: File[] = files.map((file: Dirent) => this.toResponse(file, path));
      event.reply(request.responseChannel, response);
    }, (error: any) => {
      console.log(error);
    });
  }

  private toResponse(file: Dirent, path: string): File {
    let fullPath: string = PathUtils.joinPath(path, file.name);
    let extension: string = PathUtils.getExtension(fullPath);
    return {
      name: file.name,
      path: fullPath,
      extension: extension,
      isDirectory: file.isDirectory(),
      fileIds: [],
    }
  }
}