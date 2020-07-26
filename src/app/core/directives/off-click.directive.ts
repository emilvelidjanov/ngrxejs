import { Directive, ElementRef, EventEmitter, HostListener, Inject, Output } from '@angular/core';

import { DomService } from '../services/DOM-service/dom.service';
import { domServiceDep } from '../services/DOM-service/dom.service.dependency';

@Directive({
  selector: '[appOffClick]',
})
export class OffClickDirective {
  @Output() public readonly appOffClick: EventEmitter<MouseEvent>;

  constructor(private elementRef: ElementRef, @Inject(domServiceDep.getToken()) private domService: DomService) {
    this.appOffClick = new EventEmitter<MouseEvent>();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick($event: MouseEvent): void {
    const targetElement = $event.target as HTMLElement;
    const refElement = this.elementRef.nativeElement as HTMLElement;
    const isHidden = refElement.hidden || refElement.style.display === 'none';
    if (!isHidden && targetElement && !this.domService.containsOrIsEqual(refElement, targetElement)) {
      this.appOffClick.emit($event);
    }
  }
}
