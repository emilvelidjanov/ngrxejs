import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { menuBarActions } from '../../store/menu-bar/menu-bar.actions';
import { menuBarSelectors } from '../../store/menu-bar/menu-bar.selectors';
import { MenuBar, MenuBars } from '../../store/menu-bar/menu-bar.state';

import { MenuBarService } from './menu-bar.service';

@Injectable()
export class DefaultMenuBarService implements MenuBarService {
  constructor(private store: Store<MenuBars>, @Inject(uuidGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService) {}

  public createDefault(partial: EntityPartial<MenuBar>): MenuBar {
    const menuBar: MenuBar = {
      id: null,
      title: null,
      menuItemIds: [],
      image: null,
      ...partial,
    };
    return menuBar;
  }

  public createOne(partial: IdLessPartial<MenuBar>): Observable<MenuBar> {
    const uuid = this.idGeneratorService.nextId();
    return of(this.createDefault({ id: uuid, ...partial }));
  }

  public createMany(partials: IdLessPartial<MenuBar>[]): Observable<MenuBar[]> {
    const uuids = this.idGeneratorService.nextNIds(partials.length);
    const entities = uuids.map((uuid, index) => {
      const partial = partials[index];
      return this.createDefault({ id: uuid, ...partial });
    });
    return of(entities);
  }

  public addOne(entity: MenuBar): void {
    if (entity) {
      this.store.dispatch(menuBarActions.addOne({ entity }));
    }
  }

  public addMany(entities: MenuBar[]): void {
    if (entities && entities.length) {
      this.store.dispatch(menuBarActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<MenuBar> {
    return this.store.pipe(select(menuBarSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<MenuBar[]> {
    return this.store.pipe(select(menuBarSelectors.selectEntitiesByIds, { ids }));
  }
}
