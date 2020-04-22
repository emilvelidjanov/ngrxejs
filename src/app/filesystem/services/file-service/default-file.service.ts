import { FileService } from './file.service';
import { File, Files } from '../../store/state/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { Store, select } from '@ngrx/store';
import { Inject } from '@angular/core';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { selectIds } from '../../store/reducers';


export class DefaultFileService implements FileService {

  private usedIds: number[] | string[];

  constructor(
    private store: Store<Files>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.store.pipe(select(selectIds)).subscribe((usedIds: number[] | string[]) => {
      this.usedIds = usedIds;
    });
  }

  createFiles(loadDirectoryResults: LoadDirectoryResult[]): File[] {
    let size: number = loadDirectoryResults.length;
    let ids: (number | string)[] = this.idGeneratorService.nextNIds(size, this.usedIds);
    let files: File[] = ids.map((id: number | string, index: number) => {
      return {
        id: id,
        fileIds: [],
        ...loadDirectoryResults[index],
      }
    });
    return files;
  }

  createFile(loadDirectoryResult: LoadDirectoryResult): File {
    return {
      id: this.idGeneratorService.nextId(this.usedIds),
      fileIds: [],
      ...loadDirectoryResult,
    }
  }
}