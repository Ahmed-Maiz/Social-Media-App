import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatPosts } from './creat-posts';

describe('CreatPosts', () => {
  let component: CreatPosts;
  let fixture: ComponentFixture<CreatPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatPosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
