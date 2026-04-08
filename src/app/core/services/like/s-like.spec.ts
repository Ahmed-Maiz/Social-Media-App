import { TestBed } from '@angular/core/testing';

import { SLike } from './s-like';

describe('SLike', () => {
  let service: SLike;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SLike);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
