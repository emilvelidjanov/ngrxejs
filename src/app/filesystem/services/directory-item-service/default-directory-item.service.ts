import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { directoryItemActions } from '../../store/directory-item/directory-item.actions';
import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { DirectoryItem, DirectoryItems } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

import { DirectoryItemService } from './directory-item.service';

@Injectable()
export class DefaultDirectoryItemService implements DirectoryItemService {
  private directoryItemIds: Observable<Id[]>;

  constructor(
    private store: Store<DirectoryItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.directoryItemIds = this.store.pipe(select(directoryItemSelectors.selectIds));
  }

  public addMany(directoryItems: DirectoryItem[]): void {
    if (directoryItems && directoryItems.length) {
      this.store.dispatch(directoryItemActions.addMany({ entities: directoryItems }));
    }
  }

  public createMany(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]> {
    const size = directories.length;
    const directoryItems$ = this.directoryItemIds.pipe(
      map((ids) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids) =>
        ids.map((id, index) => {
          const directoryItem: DirectoryItem = {
            id,
            directoryId: directories[index].id,
            directoryItemIds: [],
            fileItemIds: [],
            projectTreeId: projectTree.id,
            isOpened: false,
          };
          return directoryItem;
        }),
      ),
      take(1),
    );
    return directoryItems$;
  }

  public setAll(directoryItems: DirectoryItem[]): void {
    this.store.dispatch(directoryItemActions.setAll({ entities: directoryItems }));
  }

  public toggleOpened(directoryItem: DirectoryItem): void {
    this.store.dispatch(
      directoryItemActions.updateOne({
        update: {
          id: directoryItem.id,
          changes: {
            isOpened: !directoryItem.isOpened,
          },
        },
      }),
    );
  }

  public updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]): void {
    this.store.dispatch(
      directoryItemActions.updateOne({
        update: {
          id: directoryItem.id,
          changes: {
            fileItemIds: fileItems.map((item) => item.id),
            directoryItemIds: directoryItems.map((item) => item.id),
          },
        },
      }),
    );
  }
}
