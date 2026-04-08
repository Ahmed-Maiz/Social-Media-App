import { TestBed } from '@angular/core/testing';

import { MtTranslat } from './mt-translat';

describe('MtTranslat', () => {
  let service: MtTranslat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtTranslat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
