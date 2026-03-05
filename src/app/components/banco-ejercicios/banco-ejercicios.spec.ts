import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoEjercicios } from './banco-ejercicios';

describe('BancoEjercicios', () => {
  let component: BancoEjercicios;
  let fixture: ComponentFixture<BancoEjercicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoEjercicios],
    }).compileComponents();

    fixture = TestBed.createComponent(BancoEjercicios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
