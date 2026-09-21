import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifarioConvenio } from './tarifario-convenio';

describe('TarifarioConvenio', () => {
  let component: TarifarioConvenio;
  let fixture: ComponentFixture<TarifarioConvenio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifarioConvenio],
    }).compileComponents();

    fixture = TestBed.createComponent(TarifarioConvenio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
