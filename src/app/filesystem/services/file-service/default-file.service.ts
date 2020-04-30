import { FileService } from './file.service';
import { File, Files } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { Store, select } from '@ngrx/store';
import { Inject } from '@angular/core';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { fileSelectors } from '../../store/file/file.selector';
import { Id } from 'src/app/core/ngrx/entity';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


export class DefaultFileService implements FileService {

  private fileIds: Id[];  //TODO: make observable?
  private fileIds$: Observable<Id[]>;

  constructor(
    private store: Store<Files>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.store.pipe(select(fileSelectors.selectIds)).subscribe((fileIds: Id[]) => {
      this.fileIds = fileIds;
    });
    this.fileIds$ = this.store.pipe(select(fileSelectors.selectIds));
  }

  createFiles(loadDirectoryResults: LoadDirectoryResult[]): File[] {
    let size: number = loadDirectoryResults.length;
    let ids: Id[] = this.idGeneratorService.nextNIds(size, this.fileIds);
    let files: File[] = ids.map((id: Id, index: number) => {
      return {
        id: id,
        fileIds: [],
        ...loadDirectoryResults[index],
      }
    });
    return files;
  }

  createFiles$(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]> {
    const size: number = loadDirectoryResults.length;
    const files$ = this.fileIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextNIds(size, ids)),
      map((nextIds: Id[]) => this.mapToFiles(nextIds, loadDirectoryResults)),
      take(1)
    )
    return files$;
  }

  createFile(loadDirectoryResult: LoadDirectoryResult): File {
    return {
      id: this.idGeneratorService.nextId(this.fileIds),
      fileIds: [],
      ...loadDirectoryResult,
    }
  }

  private mapToFiles(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): File[] {
    let files: File[] = ids.map((id: Id, index: number) => {
      return {
        id: id,
        fileIds: [],
        ...loadDirectoryResults[index],
      }
    });
    return files;
  }
}