import { TestBed } from '@angular/core/testing';

import { LocalFilesystemService } from './local-filesystem.service';

describe('LocalFilesystemService', () => {
  let service: LocalFilesystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalFilesystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
