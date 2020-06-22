import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { projectActions } from '../../store/project/project.actions';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project, Projects } from '../../store/project/project.state';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeComponent implements OnInit {
  public project$: Observable<Project>;
  public contextMenuId: string;

  constructor(private store: Store<Projects>) {
    this.contextMenuId = 'fileTreeContextMenu';
  }

  public ngOnInit(): void {
    this.project$ = this.store.pipe(select(projectSelectors.selectFirstOpenedEntity));
  }

  @HostListener('contextmenu', ['$event'])
  public onContextMenu($event: MouseEvent): void {
    this.store.dispatch(
      projectActions.openContextMenu({
        id: this.contextMenuId,
        x: $event.x,
        y: $event.y,
      }),
    );
  }
}
