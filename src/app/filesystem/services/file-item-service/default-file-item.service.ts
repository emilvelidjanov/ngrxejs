import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { fileItemActions } from '../../store/file-item/file-item.actions';
import { fileItemSelectors } from '../../store/file-item/file-item.selectors';
import { FileItem, FileItems } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

import { FileItemService } from './file-item.service';

@Injectable()
export class DefaultFileItemService implements FileItemService {
  private fileItemIds: Observable<Id[]>;

  constructor(
    private store: Store<FileItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.fileItemIds = this.store.pipe(select(fileItemSelectors.selectIds));
  }

  public createMany(files: File[], projectTree: ProjectTree): Observable<FileItem[]> {
    const size = files.length;
    const fileItems$ = this.fileItemIds.pipe(
      map((ids) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids) =>
        ids.map((id, index) => {
          const fileItem: FileItem = {
            id,
            fileId: files[index].id,
            projectTreeId: projectTree.id,
          };
          return fileItem;
        }),
      ),
      take(1),
    );
    return fileItems$;
  }

  public addMany(fileItems: FileItem[]): void {
    if (fileItems && fileItems.length) {
      this.store.dispatch(fileItemActions.addMany({ entities: fileItems }));
    }
  }

  public selectByFiles(files: File[]): Observable<FileItem[]> {
    const fileIds = files.map((file) => file.id);
    return this.store.pipe(
      select(fileItemSelectors.selectEntitiesByPredicate, { predicate: (entity) => fileIds.includes(entity.fileId) }),
    );
  }
}
