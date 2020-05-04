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
import { fileActions } from '../../store/file/file.action';


export class DefaultFileService implements FileService {

  private fileIds$: Observable<Id[]>;

  constructor(
    private store: Store<Files>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.fileIds$ = this.store.pipe(select(fileSelectors.selectIds));
  }

  createFiles(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]> {
    const size: number = loadDirectoryResults.length;
    const files$ = this.fileIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextNIds(size, ids)),
      map((nextIds: Id[]) => this.mapToFiles(nextIds, loadDirectoryResults)),
      take(1)
    );
    return files$;
  }

  dispatchSetAll(files: File[]): void {
    this.store.dispatch(fileActions.setAll({entities: files}));
  }

  dispatchLoadedDirectory(directory: File, files: File[]): void {
    this.store.dispatch(fileActions.addMany({entities: files}));
    this.store.dispatch(fileActions.updateOne({update: {
      id: directory.id as number, //TODO: fix...
      changes: {
        isDirectoryLoaded: true,
        fileIds: files.map((file: File) => file.id),
      }
    }}));
  }

  dispatchOpenedDirectory(directory: File): void {
    this.store.dispatch(fileActions.updateOne({update: {
      id: directory.id as number,
      changes: {
        isDirectoryOpened: !directory.isDirectoryOpened
      }
    }}));
  }

  private mapToFiles(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): File[] {
    let files: File[] = ids.map((id: Id, index: number) => {
      return {
        id: id,
        fileIds: [],
        isDirectoryLoaded: false,
        isDirectoryOpened: false,
        ...loadDirectoryResults[index],
      }
    });
    return files;
  }
}