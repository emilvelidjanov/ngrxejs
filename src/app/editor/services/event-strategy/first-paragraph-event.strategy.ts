import { Inject } from '@angular/core';
import { DomService } from 'src/app/core/services/DOM-service/dom.service';
import { domServiceDep } from 'src/app/core/services/DOM-service/dom.service.dependency';

import { EventStrategy } from './event.strategy';

export class FirstParagraphEventStrategy implements EventStrategy {
  constructor(@Inject(domServiceDep.getToken()) private domService: DomService) {}

  public shouldExecute(event: Event, element: HTMLElement): boolean {
    const isKeyboardEvent = event instanceof KeyboardEvent;
    const isEmptyElement = !element.innerHTML || !element.innerHTML.length;
    const hasRange = !!this.domService.getSelectionRange();
    return isKeyboardEvent && isEmptyElement && hasRange;
  }

  public execute(_event: Event, element: HTMLElement): void {
    const paragraph = this.domService.createEmptySelectableElement('p');
    if (this.domService.insertNodeAtCurrentRange(paragraph)) {
      this.domService.selectNode(element, paragraph);
    }
  }
}
