import { FileService } from './file.service';
import { File, Files } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { Store, select } from '@ngrx/store';
import { Inject } from '@angular/core';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { fileSelectors } from '../../store/file/file.selector';
import { Id } from 'src/app/core/ngrx/entity';


export class DefaultFileService implements FileService {

  private fileIds: Id[];  //TODO: make observable?

  constructor(
    private store: Store<Files>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.store.pipe(select(fileSelectors.selectIds)).subscribe((fileIds: Id[]) => {
      this.fileIds = fileIds;
    });
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

  createFile(loadDirectoryResult: LoadDirectoryResult): File {
    return {
      id: this.idGeneratorService.nextId(this.fileIds),
      fileIds: [],
      ...loadDirectoryResult,
    }
  }
}