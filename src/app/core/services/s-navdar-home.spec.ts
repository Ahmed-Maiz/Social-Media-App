import { TestBed } from '@angular/core/testing';

import { SNavdarHome } from './s-navdar-home';

describe('SNavdarHome', () => {
  let service: SNavdarHome;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SNavdarHome);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
