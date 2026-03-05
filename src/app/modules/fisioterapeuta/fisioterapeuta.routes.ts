import { Routes } from '@angular/router';
import { RegistroComponent } from './presentation/pages/registro/registro';
import { VerificacionCorreoComponent } from './presentation/pages/verificacion-correo/verificacion-correo';
import { CuentaVerificadaComponent } from './presentation/pages/cuenta-verificada/cuenta-verificada';
import { Error404 } from './presentation/pages/error-404/error-404';
import { CompletarPerfilComponent } from './presentation/pages/completar-perfil/completar-perfi';

export const FISIOTERAPEUTA_ROUTES: Routes = [
  { path: 'registro', component: RegistroComponent, title: 'Crear Cuenta | ACTIVA' },
  { path: 'verificacion-correo', component: VerificacionCorreoComponent, title: 'Casi Listo | ACTIVA' },
  { path: 'cuenta-verificada', component: CuentaVerificadaComponent, title: 'Cuenta Verificada | ACTIVA' },
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'completar-perfil', component: CompletarPerfilComponent, title: 'Completar Perfil | ACTIVA' },
  { path: '404', component: Error404, title: 'Página No Encontrada | ACTIVA' },
];