import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Componentes de Login y Register
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// CRUD de Administrador
import { VerAgremiadosComponent } from './components/ver-agremiados/ver-agremiados.component';
import { AgregarAgremiadosComponent } from './components/agregar-agremiados/agregar-agremiados.component';
import { AgregarSolicitudesComponent } from './components/agregar-solicitudes/agregar-solicitudes.component';

// Pagina principal por usuario
import { InicioComponent } from './shared/inicio/inicio.component';
import { HomeComponent } from './pages/home/home.component';

// Componentes de Agremiados y usuarios externos
import { VerSolicitudesComponent } from './components/ver-solicitudes/ver-solicitudes.component';
import { FormatosComponent } from './pages/formatos/formatos.component';
import { ConvocatoriasComponent } from './pages/convocatorias/convocatorias.component';
import { ConveniosComponent } from './pages/convenios/convenios.component';

// Pagina de error
import { PaginaErrorComponent } from './shared/pagina-error/pagina-error.component';
import { AuthGuardAdministrador } from './guards/auth-administrador.guard';
import { AuthGuardAgremiado } from './guards/auth-agremiado.guard';

const routes: Routes = [
  {
    // Dirige en automático a Login al inicializar el proyecto
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'verAgremiado',
    component: VerAgremiadosComponent, canActivate: [AuthGuardAdministrador]
  },
  {
    path: 'agregarAgremiado',
    component: AgregarAgremiadosComponent, canActivate: [AuthGuardAdministrador]
  },
  {
    path: 'verAgremiado',
    component: VerAgremiadosComponent, canActivate: [AuthGuardAdministrador]
  },
  {
    path: 'agregarSolicitud',
    component: AgregarSolicitudesComponent, canActivate: [AuthGuardAgremiado]
  },
  {
    path: 'Solicitudes',
    component: VerSolicitudesComponent, canActivate: [AuthGuardAdministrador]
  },
  {
    path: 'Formatos',
    component: FormatosComponent
  },
  {
    path: 'Convocatorias',
    component: ConvocatoriasComponent
  },
  {
    path: 'Convenios',
    component: ConveniosComponent
  },
  {
    path: 'homeAdmin',
    component: InicioComponent, canActivate: [AuthGuardAdministrador]
  },
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuardAgremiado]
  },
  {
    path: 'page-error',
    component: PaginaErrorComponent
  },
  {
    // Redirige en caso de que la url no existe
    path: '**',
    redirectTo: '/page-error'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
