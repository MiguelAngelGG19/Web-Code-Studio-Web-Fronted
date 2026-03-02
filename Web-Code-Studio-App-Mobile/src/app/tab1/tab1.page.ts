import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../core/domain/models/user.model';
import { GetUserProfileUseCase } from '../../core/usecases/get-user-profile.usecase';

interface Ejercicio {
  nombre: string;
  repeticiones: string;
  completado: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit, OnDestroy {
  user: User | null = null;
  ejercicios: Ejercicio[] = [
    { nombre: 'Estiramiento de cuádriceps', repeticiones: '3 series de 10', completado: true },
    { nombre: 'Elevación de pierna recta', repeticiones: '2 series de 15', completado: false },
    { nombre: 'Flexión isométrica', repeticiones: '5 min', completado: false },
  ];

  private sub?: Subscription;

  constructor(private getUserProfile: GetUserProfileUseCase) {}

  ngOnInit(): void {
    this.sub = this.getUserProfile.execute(1).subscribe({
      next: (data) => (this.user = data),
      error: (err) => console.error('Error loading user profile', err),
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
