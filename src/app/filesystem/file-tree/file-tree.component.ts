import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FilesystemService, SelectDialogResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from "../filesystem-service/filesystem.service.dependency";


@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {

  constructor(
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService
  ) { }

  ngOnInit(): void {
  }

  public runFilesystemService(): void {
    this.filesystemService.openSelectDialog().subscribe((data: SelectDialogResult) => {
      console.log(data);
    });
  }

}
