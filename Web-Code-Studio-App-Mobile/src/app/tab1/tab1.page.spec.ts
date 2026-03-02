import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1Page } from './tab1.page';
import { GetUserProfileUseCase } from '../../../usecases/get-user-profile.usecase';
import { UserRepository } from '../../core/domain/repositories/user.repository';

const mockUser = { id: 1, fullName: 'Test User', email: 'test@test.com', progress: 0.5 };

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
      providers: [
        GetUserProfileUseCase,
        { provide: UserRepository, useValue: { getUserById: () => of(mockUser) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on init', () => {
    expect(component.user).toEqual(mockUser);
  });
});
