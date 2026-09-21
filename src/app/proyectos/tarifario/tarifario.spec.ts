import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarifario } from './tarifario';

describe('Tarifario', () => {
  let component: Tarifario;
  let fixture: ComponentFixture<Tarifario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarifario],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarifario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
