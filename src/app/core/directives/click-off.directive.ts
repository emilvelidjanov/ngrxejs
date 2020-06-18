import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOff]',
})
export class ClickOffDirective {
  @Output() public readonly appClickOff: EventEmitter<MouseEvent>;

  constructor(private elementRef: ElementRef) {
    this.appClickOff = new EventEmitter<MouseEvent>();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick($event: MouseEvent): void {
    const targetElement: HTMLElement = $event.target as HTMLElement;
    const refElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
    if (targetElement && !refElement.contains(targetElement)) {
      this.appClickOff.emit($event);
    }
  }
}
