import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu'; 
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule, AvatarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [ //items que se implementan o usan
      { label: 'Pacientes', icon: 'pi pi-users' },
      { label: 'Calendario', icon: 'pi pi-calendar' },
      { label: 'Ejercicios', icon: 'pi pi-arrows-alt' }
    ];
  }
}