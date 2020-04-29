import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { File, Files } from '../../store/file/file.state';
import { Observable } from 'rxjs';
import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { Store, select } from '@ngrx/store';
import { fileSelectors } from '../../store/file/file.selector';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';


@Component({
  selector: 'app-file-item[file]',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileItemComponent implements OnInit {

  @Input("file") file: File;
  nestedFiles$: Observable<File[]>;

  constructor(
    private store: Store<Files>,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) { }

  ngOnInit(): void {
    this.nestedFiles$ = this.store.pipe(select(fileSelectors.selectEntitiesByIds, {ids: this.file.fileIds}));
  }

  loadDirectory(): void {
    if (this.file.isDirectory) {
      this.filesystemFacade.loadDirectory(this.file);
    }
  }
}
