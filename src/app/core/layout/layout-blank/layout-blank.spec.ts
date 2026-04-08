import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBlank } from './layout-blank';

describe('LayoutBlank', () => {
  let component: LayoutBlank;
  let fixture: ComponentFixture<LayoutBlank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBlank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBlank);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
