import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-focus-input[type]',
  templateUrl: './focus-input.component.html',
  styleUrls: ['./focus-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusInputComponent implements OnInit, OnChanges {
  @ViewChild('input', { static: true }) public input: ElementRef<HTMLInputElement>;

  @Input() public type: string;
  @Input() public isFocused: boolean;

  @Output() public enter = new EventEmitter<string>();

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (this.isFocused) {
      this.input.nativeElement.focus();
    } else if (!this.isFocused) {
      this.input.nativeElement.blur();
    }
  }

  public emitValue($event: InputEvent) {
    const target = $event.target as HTMLInputElement;
    this.enter.emit(target.value);
  }
}
