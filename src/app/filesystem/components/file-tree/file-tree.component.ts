import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FilesystemState } from '../../store';
import { projectSelectors } from '../../store/project/project.selector';
import { Observable } from 'rxjs';
import { Project } from '../../store/project/project.state';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {

  private openProject$: Observable<Project>;

  constructor(
    private store: Store<FilesystemState>
  ) {
    this.openProject$ = this.store.pipe(select(projectSelectors.selectOpenProject));
  }

  ngOnInit(): void {
  }
}
