import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarPerfilComponent } from './completar-perfi';

describe('CompletarPerfilComponent', () => {
  let component: CompletarPerfilComponent;
  let fixture: ComponentFixture<CompletarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletarPerfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletarPerfilComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
