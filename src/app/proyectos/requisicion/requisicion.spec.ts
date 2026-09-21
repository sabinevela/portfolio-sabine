import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Requisicion } from './requisicion';

describe('Requisicion', () => {
  let component: Requisicion;
  let fixture: ComponentFixture<Requisicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Requisicion],
    }).compileComponents();

    fixture = TestBed.createComponent(Requisicion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
