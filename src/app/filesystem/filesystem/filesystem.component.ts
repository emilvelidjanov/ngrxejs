import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filesystem',
  templateUrl: './filesystem.component.html',
  styleUrls: ['./filesystem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesystemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
