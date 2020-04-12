import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { filesystemServiceToken } from "../filesystem-service/filesystem.service.provider";


@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {

  constructor(
    @Inject(filesystemServiceToken) private filesystemService: FilesystemService
  ) { }

  ngOnInit(): void {
  }

  public runFilesystemService(): void {
    this.filesystemService.debug();
    this.filesystemService.openSelectDialog();
  }

}
