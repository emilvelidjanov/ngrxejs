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

import { DirectoryItemService } from './directory.service';

@Injectable()
export class DefaultDirectoryItemService implements DirectoryItemService {
  private directoryItemIds: Observable<Id[]>;

  constructor(
    private store: Store<DirectoryItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.directoryItemIds = this.store.pipe(select(directoryItemSelectors.selectIds));
  }

  public addMany(directoryItems: DirectoryItem[]) {
    this.store.dispatch(directoryItemActions.addMany({ entities: directoryItems }));
  }

  public createMany(directories: Directory[]): Observable<DirectoryItem[]> {
    const size: number = directories.length;
    const directoryItems$ = this.directoryItemIds.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids: Id[]) => this.mapTo(ids, directories)),
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
          id: directoryItem.id as number,
          changes: {
            isOpened: !directoryItem.isOpened,
          },
        },
      }),
    );
  }

  public updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]) {
    this.store.dispatch(
      directoryItemActions.updateOne({
        update: {
          id: directoryItem.id as number,
          changes: {
            fileItemIds: fileItems.map((item: FileItem) => item.id),
            directoryItemIds: directoryItems.map((item: DirectoryItem) => item.id),
          },
        },
      }),
    );
  }

  private mapTo(ids: Id[], directories: Directory[]): DirectoryItem[] {
    const directoryItems: DirectoryItem[] = ids.map((id: Id, index: number) => {
      const directoryItem: DirectoryItem = {
        id,
        directoryId: directories[index].id,
        directoryItemIds: [],
        fileItemIds: [],
        isOpened: false,
        contextMenuId: 'directoryItemContextMenu',
      };
      return directoryItem;
    });
    return directoryItems;
  }
}
