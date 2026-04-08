import { TestBed } from '@angular/core/testing';

import { SNotifications } from './s-notifications';

describe('SNotifications', () => {
  let service: SNotifications;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SNotifications);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
