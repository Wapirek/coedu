import { TestBed } from '@angular/core/testing';

import { SpaService } from './spa.service';

describe('SpaService', () => {
  let service: SpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
