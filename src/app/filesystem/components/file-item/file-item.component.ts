import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { fileItemActions } from '../../store/file-item/file-item.actions';
import { fileItemSelectors } from '../../store/file-item/file-item.selectors';
import { FileItem, FileItems } from '../../store/file-item/file-item.state';
import { fileSelectors } from '../../store/file/file.selectors';
import { File } from '../../store/file/file.state';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

@Component({
  selector: 'app-file-item[fileItemId]',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItemComponent implements OnInit {
  @Input() public fileItemId: Id;
  public fileItem$: Observable<FileItem>;
  public file$: Observable<File>;
  public projectTree$: Observable<ProjectTree>;

  constructor(private store: Store<FileItems>) {}

  public ngOnInit(): void {
    this.fileItem$ = this.store.pipe(select(fileItemSelectors.selectEntityById, { id: this.fileItemId }));
    this.file$ = this.fileItem$.pipe(
      filter((fileItem) => !!fileItem && fileItem.fileId !== null),
      switchMap((fileItem) => this.store.pipe(select(fileSelectors.selectEntityById, { id: fileItem.fileId }))),
    );
    this.projectTree$ = this.fileItem$.pipe(
      filter((fileItem) => !!fileItem && fileItem.projectTreeId !== null),
      switchMap((fileItem) =>
        this.store.pipe(select(projectTreeSelectors.selectEntityById, { id: fileItem.projectTreeId })),
      ),
    );
  }

  public click(): void {
    this.fileItem$
      .pipe(take(1))
      .subscribe((fileItem) => this.store.dispatch(fileItemActions.onClick({ entity: fileItem })));
  }
}
