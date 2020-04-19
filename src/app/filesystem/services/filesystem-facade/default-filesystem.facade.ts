import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from './filesystem.facade';
import { FilesystemService, OpenDialogResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import openProjectOptions from "src/config/filesystem/openProjectOptions.json";
import { State } from 'src/app/filesystem/store/reducers';
import { Store, select } from '@ngrx/store';
import { forkJoin, of, Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { File } from '../../store/state/file.state';
import { Project } from '../../store/state/project.state';
import { addProject } from '../../store/actions/file.action';
import { numberIdGeneratorServiceDep } from 'src/app/core/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/id-generator-service/id-generator.service';


@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor(
    private store: Store<State>,
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) { }

  openProject(): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions);  //TODO: config service?
    const loadDirectory$ = openDialog$.pipe(
      switchMap((openDialogResult: OpenDialogResult) => this.loadDirectoryOfOpenedProject(openDialogResult))
    );
    forkJoin({
      openedDialog: openDialog$,
      loadedDirectory: loadDirectory$
    }).subscribe((result) => {
      if (!result.openedDialog.canceled) {
        let project: Project = {
          id: this.idGeneratorService.nextId([1, 2, 4]),
          name: "Test Project",
          directory: result.openedDialog.filePaths[0],
          fileIds: [],
        }
        this.store.dispatch(addProject({project}));
      }
    }, (error: any) => console.error(error));
  }

  private loadDirectoryOfOpenedProject(openDialogResult: OpenDialogResult): Observable<File[]> {
    if (!openDialogResult.canceled) {
      let path: string = openDialogResult.filePaths[0];
      return this.filesystemService.loadDirectory(path);
    }
    return of([]).pipe(first());
  }
}
