import { TestBed } from '@angular/core/testing';

import { SFollow } from './s-follow';

describe('SFollow', () => {
  let service: SFollow;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SFollow);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
