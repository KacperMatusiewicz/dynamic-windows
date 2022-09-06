import {TestBed} from '@angular/core/testing';

import {WindowStoreService} from './window-store.service';

describe('WindowStoreService', () => {
  let service: WindowStoreService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
