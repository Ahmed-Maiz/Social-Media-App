import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglPost } from './singl-post';

describe('SinglPost', () => {
  let component: SinglPost;
  let fixture: ComponentFixture<SinglPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
