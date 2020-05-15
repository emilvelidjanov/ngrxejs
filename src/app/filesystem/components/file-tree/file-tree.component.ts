import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { projectSelectors } from '../../store/project/project.selectors';
import { Observable } from 'rxjs';
import { Project, Projects } from '../../store/project/project.state';


@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {

  project$: Observable<Project>;

  constructor(
    private store: Store<Projects>,
  ) { }

  ngOnInit(): void {
    this.project$ = this.store.pipe(select(projectSelectors.selectOpenProject));
  }
}
