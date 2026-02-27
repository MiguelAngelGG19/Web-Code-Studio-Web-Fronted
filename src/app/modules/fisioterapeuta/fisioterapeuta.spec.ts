import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fisioterapeuta } from './fisioterapeuta';

describe('Fisioterapeuta', () => {
  let component: Fisioterapeuta;
  let fixture: ComponentFixture<Fisioterapeuta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fisioterapeuta],
    }).compileComponents();

    fixture = TestBed.createComponent(Fisioterapeuta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
