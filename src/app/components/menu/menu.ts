import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // <-- 1. Agregamos Router
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

  // 🔥 2. VARIABLE QUE CONTROLA LA SALA DE ESPERA
  estadoCuenta: 'pending_approval' | 'approved' = 'pending_approval';

  // 3. INYECTAMOS EL ROUTER
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
    this.verificarEstadoCuenta(); // <-- 4. Revisamos el Gafete al iniciar
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        this.isDesktopCollapsed = false; 
      } else {
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

  // 🛡️ 5. LÓGICA DE SEGURIDAD Y REDIRECCIÓN
  // 🛡️ LÓGICA DE SEGURIDAD Y REDIRECCIÓN
  verificarEstadoCuenta() {
    const token = localStorage.getItem('token');
    // ✨ LEEMOS SI ACABA DE SUBIR DOCUMENTOS EN ESTA SESIÓN
    const acabaDeSubirDocs = localStorage.getItem('documentos_subidos') === 'true';
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("🕵️‍♂️ EL ESTATUS EN EL COMPONENTE MENU ES:", payload.status);
        
        // Si el admin ya lo aprobó, entra directo
        if (payload.status === 'approved') {
          this.estadoCuenta = 'approved'; 
        } 
        // Si el token dice que está en revisión, O si acaba de subirlos ahorita mismo
        else if (payload.status === 'pending_approval' || acabaDeSubirDocs) {
          this.estadoCuenta = 'pending_approval'; 
        } 
        // Si el token dice que le faltan, y NO los acaba de subir, lo regresamos
        else if (payload.status === 'pending_profile') {
          this.router.navigate(['/verificar-datos']);
        }
      } catch (error) {
        console.error('Error leyendo el token', error);
        this.estadoCuenta = 'pending_approval'; 
      }
    }
  }
  // 🚪 6. FUNCIÓN PARA CERRAR SESIÓN DESDE LA SALA DE ESPERA
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('documentos_subidos');
    this.router.navigate(['/login']);
  }
}