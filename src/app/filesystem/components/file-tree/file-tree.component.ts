import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FilesystemState } from '../../store';
import { projectSelectors } from '../../store/project/project.selector';
import { Observable } from 'rxjs';
import { Project } from '../../store/project/project.state';
import { File } from '../../store/file/file.state';


@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {

  project$: Observable<Project>;
  files$: Observable<File[]>;

  constructor(
    private store: Store<FilesystemState>,
  ) { }

  ngOnInit(): void {
    this.project$ = this.store.pipe(select(projectSelectors.selectOpenProject));
    this.files$ = this.store.pipe(select(projectSelectors.selectOpenProjectFiles));
  }
}
