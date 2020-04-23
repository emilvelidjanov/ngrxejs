import { ProjectService } from './project.service';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';
import { Project, Projects } from '../../store/project/project.state';
import { File } from '../../store/file/file.state';
import { Store, select } from '@ngrx/store';
import { Inject } from '@angular/core';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { projectSelectors } from '../../store/project/project.selector';
import { Id } from 'src/app/core/ngrx/entity';


export class DefaultProjectService implements ProjectService {

  private usedIds: Id[];

  constructor(
    private store: Store<Projects>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.store.pipe(select(projectSelectors.selectIds)).subscribe((usedIds: Id[]) => {  //TODO: externalize this logic...
      this.usedIds = usedIds;
    });
  }

  createProject(openDialogResult: OpenDialogResult, files: File[]): Project {
    if (openDialogResult.filePaths.length != 1) {
      throw new Error(`Cannot create project: OpenDialogResult has ${openDialogResult.filePaths.length} entries.`);
    }
    return {
      id: this.idGeneratorService.nextId(this.usedIds),
      directory: openDialogResult.filePaths[0],
      name: openDialogResult.filenames[0],
      fileIds: files.map((file: File) => file.id),
    }
  }
}