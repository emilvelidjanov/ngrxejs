import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

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
  public contextProps$: Observable<PropId>;

  constructor(private store: Store<FileItems>) {}

  public ngOnInit(): void {
    this.fileItem$ = this.store.pipe(
      select(fileItemSelectors.selectEntityById, { id: this.fileItemId }),
      filter((fileItem) => !!fileItem), // TODO: write own operators?
    );
    this.file$ = this.fileItem$.pipe(
      filter((fileItem) => !!fileItem.fileId),
      switchMap((fileItem) => this.store.pipe(select(fileSelectors.selectEntityById, { id: fileItem.fileId }))), // TODO: make more selectors?
    );
    this.projectTree$ = this.fileItem$.pipe(
      filter((fileItem) => !!fileItem.projectTreeId),
      switchMap((fileItem) =>
        this.store.pipe(select(projectTreeSelectors.selectEntityById, { id: fileItem.projectTreeId })),
      ),
    );
    this.contextProps$ = this.fileItem$.pipe(
      filter((fileItem) => !!fileItem.id),
      map((fileItem) => ({ id: fileItem.id })),
    );
  }

  public click(): void {
    this.fileItem$
      .pipe(take(1))
      .subscribe((fileItem) => this.store.dispatch(fileItemActions.onClick({ entity: fileItem })));
  }
}
