import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOffClick]',
})
export class OffClickDirective {
  @Output() public readonly appOffClick: EventEmitter<MouseEvent>;

  constructor(private elementRef: ElementRef) {
    this.appOffClick = new EventEmitter<MouseEvent>();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick($event: MouseEvent): void {
    const targetElement: HTMLElement = $event.target as HTMLElement;
    const refElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
    const isHidden: boolean = refElement.hidden || refElement.style.display === 'none';
    if (!isHidden && targetElement && !refElement.contains(targetElement)) {
      this.appOffClick.emit($event);
    }
  }
}
