import { TestBed } from '@angular/core/testing';

import { PostComments } from './post-comments';

describe('PostComments', () => {
  let service: PostComments;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostComments);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
