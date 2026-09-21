import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refinanciamiento } from './refinanciamiento';

describe('Refinanciamiento', () => {
  let component: Refinanciamiento;
  let fixture: ComponentFixture<Refinanciamiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Refinanciamiento],
    }).compileComponents();

    fixture = TestBed.createComponent(Refinanciamiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
