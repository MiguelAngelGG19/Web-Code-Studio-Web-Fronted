import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ButtonModule } from 'primeng/button';  

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ButtonModule
  ],
  templateUrl: './menu.html'
})
export class Menu implements OnInit {
  isMobileMenuOpen: boolean = false;
  isDesktopCollapsed: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Verifica el tamaño y resetea los estados para evitar bugs
  checkScreenSize() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        // Si es celular, apagamos el modo "delgadito" por seguridad
        this.isDesktopCollapsed = false; 
      } else {
        // Si es PC, cerramos el menú flotante oscuro
        this.isMobileMenuOpen = false;
      }
    }
  }

  toggleMenu() {
    if (window.innerWidth <= 768) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    } else {
      this.isDesktopCollapsed = !this.isDesktopCollapsed;
    }
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
  }
}