import { FileService } from './file.service';
import { File, Files } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { Store, select } from '@ngrx/store';
import { Inject, Injectable } from '@angular/core';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { fileSelectors } from '../../store/file/file.selector';
import { Id } from 'src/app/core/ngrx/entity';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { fileActions } from '../../store/file/file.action';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';


@Injectable()
export class DefaultFileService implements FileService {

  private fileIds$: Observable<Id[]>;
  private loadedDirectoryIds$: Observable<Id[]>;

  constructor(
    private store: Store<Files>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
  ) {
    this.fileIds$ = this.store.pipe(select(fileSelectors.selectIds));
    this.loadedDirectoryIds$ = this.store.pipe(select(fileSelectors.selectLoadedDirectoryIds));
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

  sortFilesDefault(file: File[]): File[] {
    return this.sortService.sort(file, {
      primarySort: (a, b) => {
        if (a.isDirectory === b.isDirectory) return 0;
        if (a.isDirectory) return -1;
        if (b.isDirectory) return 1;
      },
      secondarySort: (a, b) => a.name.localeCompare(b.name)
    });
  }

  dispatchSetAll(files: File[]): void {
    this.store.dispatch(fileActions.setAll({ entities: files }));
  }

  dispatchLoadedDirectory(directory: File, files: File[]): void {
    this.store.dispatch(fileActions.addMany({ entities: files }));
    this.store.dispatch(fileActions.updateOne({
      update: {
        id: directory.id as number, //TODO: fix...
        changes: {
          fileIds: this.sortFilesDefault(files).map((file: File) => file.id),
        }
      }
    }));
    this.store.dispatch(fileActions.addLoadedDirectoryId({ id: directory.id }));
  }

  dispatchOpenedDirectory(directory: File): void {
    this.store.dispatch(fileActions.updateOne({
      update: {
        id: directory.id as number,
        changes: {
          isDirectoryOpened: !directory.isDirectoryOpened
        }
      }
    }));
  }

  isLoadedDirectory(directory: File): Observable<boolean> {
    const isLoadedDirectory$ = this.loadedDirectoryIds$.pipe(
      map((ids: Id[]) => ids.includes(directory.id)),
    );
    return isLoadedDirectory$;
  }

  private mapToFiles(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): File[] {
    let files: File[] = ids.map((id: Id, index: number) => {
      return {
        id: id,
        fileIds: [],
        isDirectoryOpened: false,
        ...loadDirectoryResults[index],
      }
    });
    return files;
  }
}