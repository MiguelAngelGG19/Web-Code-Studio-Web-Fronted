import { Routes } from '@angular/router';
import { Menu } from './components/menu/menu';
import { BancoEjerciciosComponent } from './components/banco-ejercicios/banco-ejercicios';
export const routes: Routes = [
  // 1. Dominio Fisioterapeuta (Pantallas de Login/Registro públicas)
  {

    path: 'fisioterapeuta',
    loadChildren: () => import('./features/fisioterapeuta/fisioterapeuta.routes').then(m => m.FISIOTERAPEUTA_ROUTES)
  },
{ 
    path: 'dashboard', 
    component: Menu, 
    children: [
      { path: 'ejercicios', component: BancoEjerciciosComponent }
    ]
  },
  // 2. Dominio Privado (Aquí irá el Dashboard y Pacientes más adelante)
  // Lo dejamos comentado hasta que creemos esos componentes
  /*
  {
    path: 'app',
    loadComponent: () => import('./core/presentation/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/presentation/pages/dashboard.component').then(m => m.DashboardComponent) }
    ]
  },
  */

  // 3. Redirección por defecto al abrir localhost:4200
  { 
    path: '', 
    redirectTo: 'fisioterapeuta/registro', 
    pathMatch: 'full' 
  },
  
  // 4. Ruta comodín por si el usuario escribe una URL que no existe (Error 404)
  { 
    path: '**', 
    redirectTo: 'fisioterapeuta/registro' 
  }
];