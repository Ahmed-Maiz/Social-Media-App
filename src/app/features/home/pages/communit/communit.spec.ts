import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Communit } from './communit';

describe('Communit', () => {
  let component: Communit;
  let fixture: ComponentFixture<Communit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Communit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Communit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
