import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerAgremiadosComponent } from './components/ver-agremiados/ver-agremiados.component';
import { AgregarAgremiadosComponent } from './components/agregar-agremiados/agregar-agremiados.component';
import { VerSolicitudesComponent } from './components/ver-solicitudes/ver-solicitudes.component';
import { PaginaErrorComponent } from './shared/pagina-error/pagina-error.component';
import { InicioComponent } from './shared/inicio/inicio.component';

const routes: Routes = [
  {
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
    component: VerAgremiadosComponent
  },
  {
    path: 'agregarAgremiado',
    component: AgregarAgremiadosComponent
  },
  {
    path: 'verAgremiado',
    component: VerAgremiadosComponent
  },
  {
    path: 'Solicitudes',
    component: VerSolicitudesComponent
  },
  {
    path: 'home',
    component: InicioComponent
  },
  {
    path: 'page-error',
    component: PaginaErrorComponent
  },
  {
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
