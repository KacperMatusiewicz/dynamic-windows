import { TestBed } from '@angular/core/testing';

import { DynamicWindowsCoreService } from './dynamic-windows-core.service';

describe('DynamicWindowsCoreService', () => {
  let service: DynamicWindowsCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicWindowsCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
