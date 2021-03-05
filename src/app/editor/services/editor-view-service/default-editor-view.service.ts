import { Inject } from '@angular/core';
import { DomService } from 'src/app/core/services/DOM-service/dom.service';
import { domServiceDep } from 'src/app/core/services/DOM-service/dom.service.dependency';
import { File } from 'src/app/filesystem/store/file/file.state';

import { Editor } from '../../store/editor/editor.state';
import { EventStrategy } from '../event-strategy/event.strategy';
import { inputEventStrategiesDep, keyboardEventStrategiesDep } from '../event-strategy/event.strategy.dependency';

import { EditorViewService } from './editor-view.service';

export class DefaultEditorViewService implements EditorViewService {
  constructor(
    @Inject(domServiceDep.getToken()) private domService: DomService,
    @Inject(keyboardEventStrategiesDep.getToken()) private keyboardEventStrategies: EventStrategy[],
    @Inject(inputEventStrategiesDep.getToken()) private inputEventStrategies: EventStrategy[],
  ) {}

  public executeKeyboardEventStrategies(event: KeyboardEvent, element: HTMLElement): void {
    this.executeEventStrategies(event, element, this.keyboardEventStrategies);
  }

  public executeInputEventStrategies(event: InputEvent, element: HTMLElement): void {
    this.executeEventStrategies(event, element, this.inputEventStrategies);
  }

  public setContentWithCurrentSelection(element: HTMLElement, content: string, editor: Editor): void {
    try {
      if (editor.renderMode === 'html') {
        this.domService.setInnerHTMLWithCurrentSelection(element, content);
      } else {
        this.domService.setTextContentWithCurrentSelection(element, content);
      }
    } catch {
      /* ignore */
    }
  }

  public getWhiteSpaceCSS(file: File, editor: Editor): string {
    return editor.renderMode === 'html' && file && file.extension === '.html' ? 'initial' : 'pre-wrap';
  }

  private executeEventStrategies(event: Event, element: HTMLElement, strategies: EventStrategy[]): void {
    if (event && element) {
      strategies.forEach((eventStrategy) => {
        if (eventStrategy.shouldExecute(event, element)) {
          eventStrategy.execute(event, element);
        }
      });
    }
  }
}
