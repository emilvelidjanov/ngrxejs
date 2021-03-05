import { Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { File } from 'src/app/filesystem/store/file/file.state';
import { TabItem } from 'src/app/menu/store/tab-item/tab-item.state';

import { editorActions } from '../../store/editor/editor.actions';
import { editorSelectors } from '../../store/editor/editor.selectors';
import { Editor, Editors, RenderMode } from '../../store/editor/editor.state';

import { EditorService } from './editor.service';

export class DefaultEditorService implements EditorService {
  constructor(private store: Store<Editors>, @Inject(uuidGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService) {}

  public updateRenderMode(editor: Editor, renderMode: RenderMode): void {
    if (editor && renderMode && editor.renderMode !== renderMode) {
      this.store.dispatch(
        editorActions.updateOne({
          update: {
            id: editor.id,
            changes: {
              renderMode,
            },
          },
        }),
      );
    }
  }

  public selectAll(): Observable<Editor[]> {
    return this.store.pipe(select(editorSelectors.selectAll));
  }

  public removeOne(entity: Editor): void {
    if (entity) {
      this.store.dispatch(editorActions.removeOne({ id: entity.id }));
    }
  }

  public removeMany(entities: Editor[]): void {
    if (entities && entities.length) {
      const ids = entities.map((entity) => entity.id);
      this.store.dispatch(editorActions.removeMany({ ids }));
    }
  }

  public createDefault(partial: EntityPartial<Editor>): Editor {
    const editor: Editor = {
      id: null,
      focusedFileId: null,
      openedFileIds: [],
      isFocused: false,
      tabBarId: null,
      renderMode: 'html',
      ...partial,
    };
    return editor;
  }

  public createOne(partial: IdLessPartial<Editor>): Observable<Editor> {
    const uuid = this.idGeneratorService.nextId();
    return of(this.createDefault({ id: uuid, ...partial }));
  }

  public createMany(partials: IdLessPartial<Editor>[]): Observable<Editor[]> {
    const uuids = this.idGeneratorService.nextNIds(partials.length);
    const entities = uuids.map((uuid, index) => {
      const partial = partials[index];
      return this.createDefault({ id: uuid, ...partial });
    });
    return of(entities);
  }

  public addOne(entity: Editor): void {
    if (entity) {
      this.store.dispatch(editorActions.addOne({ entity }));
    }
  }

  public addMany(entities: Editor[]): void {
    if (entities && entities.length) {
      this.store.dispatch(editorActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<Editor> {
    return this.store.pipe(select(editorSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<Editor[]> {
    return this.store.pipe(select(editorSelectors.selectEntitiesByIds, { ids }));
  }

  // TODO: make a single focusedEditorId instead?
  public focus(editor: Editor): void {
    if (!editor.isFocused) {
      this.store.dispatch(
        editorActions.map({
          entityMap: (entity) => {
            entity.isFocused = entity.id === editor.id;
            return entity;
          },
        }),
      );
    }
  }

  public selectFocused(): Observable<Editor> {
    return this.store.pipe(
      select(editorSelectors.selectAll),
      map((editors) => editors.filter((editor) => editor.isFocused)[0]),
    );
  }

  public isOpenedFile(file: File, editor: Editor): boolean {
    return file && editor && editor.openedFileIds.includes(file.id);
  }

  public addOpenedFiles(files: File[], editor: Editor): void {
    if (files) {
      const toAdd = files.filter((file) => !this.isOpenedFile(file, editor));
      if (toAdd.length) {
        this.store.dispatch(
          editorActions.updateOne({
            update: {
              id: editor.id,
              changes: {
                openedFileIds: [...editor.openedFileIds, ...toAdd.map((file) => file.id)],
              },
            },
          }),
        );
      }
    }
  }

  public focusFile(file: File, editor: Editor): void {
    if (file && editor && editor.focusedFileId !== file.id) {
      this.store.dispatch(
        editorActions.updateOne({
          update: {
            id: editor.id,
            changes: {
              focusedFileId: file.id,
            },
          },
        }),
      );
    }
  }

  public mapToTabItem(tabItem: TabItem, file: File): TabItem {
    const newTabItem: TabItem = {
      ...tabItem,
      label: file.name + file.extension,
      isClosable: true,
      clickAction: {
        type: editorActions.openFile.type,
        props: {
          id: file.id,
        },
      },
      closeAction: {
        type: editorActions.closeFile.type,
        props: {
          id: file.id,
        },
      },
    };
    return newTabItem;
  }

  public getOpenedFileIndex(file: File, editor: Editor): number {
    return editor.openedFileIds.indexOf(file.id);
  }

  public removeOpenedFiles(files: File[], editor: Editor): void {
    if (files && files.length) {
      const toRemove = files.filter((file) => editor.openedFileIds.includes(file.id)).map((file) => file.id);
      if (toRemove.length) {
        const newOpenedFileIds = editor.openedFileIds.filter((id) => !toRemove.includes(id));
        const partial: Partial<Editor> = {
          openedFileIds: newOpenedFileIds,
        };
        if (toRemove.includes(editor.focusedFileId)) {
          let index = editor.openedFileIds.indexOf(editor.focusedFileId);
          if (index >= newOpenedFileIds.length) {
            index = newOpenedFileIds.length - 1;
          }
          const newFocusedFileId = newOpenedFileIds[index] ? newOpenedFileIds[index] : null;
          partial.focusedFileId = newFocusedFileId;
        }
        this.store.dispatch(
          editorActions.updateOne({
            update: {
              id: editor.id,
              changes: partial,
            },
          }),
        );
      }
    }
  }
}
