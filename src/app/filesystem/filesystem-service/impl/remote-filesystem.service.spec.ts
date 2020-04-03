import { TestBed } from '@angular/core/testing';

import { RemoteFilesystemService } from './remote-filesystem.service';

describe('RemoteFilesystemService', () => {
  let service: RemoteFilesystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteFilesystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
