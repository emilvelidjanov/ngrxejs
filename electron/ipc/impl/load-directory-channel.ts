import { IpcChannel, IpcRequest, IpcChannelName } from '../ipc';
import { IpcMainEvent } from 'electron';
import { FsUtils } from './../../utils/fs.utils';
import { Dirent } from 'fs';
import { FileItemState } from '../../../src/app/filesystem/store/state/file-item.state';
import { PathUtils } from './../../utils/path.utils';


export class LoadDirectoryChannel implements IpcChannel<string> {

  constructor() { }

  getName(): string {
    return IpcChannelName.LOAD_DIRECTORY;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    let path: string = request.params;
    FsUtils.readDirectory(path).subscribe((files: Dirent[]) => {
      let response: FileItemState[] = files.map((file: Dirent) => 
        this.toResponse(file, path)
      );
      event.reply(request.responseChannel, response);
    }, (error: any) => {
      console.log(error);
    });
  }

  private toResponse(file: Dirent, path: string): FileItemState {
    return {
      name: file.name,
      path: PathUtils.joinPath(path, file.name),
      isDirectory: file.isDirectory(),
      children: []
    }
  }
}