import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-post-symbols[text]',
  templateUrl: './pre-post-symbols.component.html',
  styleUrls: ['./pre-post-symbols.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrePostSymbolsComponent implements OnInit {
  @Input() public text: string;
  @Input() public preSymbol: string;
  @Input() public postSymbol: string;
  @Input() public pushPostSymbol: boolean;
  public marginLeft: string;

  constructor() {}

  public ngOnInit(): void {
    this.marginLeft = this.pushPostSymbol ? 'auto' : '0.25rem';
  }
}
