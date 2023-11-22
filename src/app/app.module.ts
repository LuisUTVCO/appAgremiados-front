import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Importaciones de Ionic
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Importaciones de los components creados
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AgregarAgremiadosComponent } from './components/agregar-agremiados/agregar-agremiados.component';
import { EditarAgremiadosComponent } from './components/editar-agremiados/editar-agremiados.component';
import { VerAgremiadosComponent } from './components/ver-agremiados/ver-agremiados.component';
import { VerSolicitudesComponent } from './components/ver-solicitudes/ver-solicitudes.component';
import { InicioComponent } from './shared/inicio/inicio.component';
import { PaginaErrorComponent } from './shared/pagina-error/pagina-error.component';
import { FormatosComponent } from './pages/formatos/formatos.component';
import { ConvocatoriasComponent } from './pages/convocatorias/convocatorias.component';
import { ConveniosComponent } from './pages/convenios/convenios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginService } from './services/login.service';
import { AgregarSolicitudesComponent } from './components/agregar-solicitudes/agregar-solicitudes.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent,
    // Carpeta Auth
    LoginComponent,
    RegisterComponent,

    //Carpeta Components
    AgregarAgremiadosComponent,
    EditarAgremiadosComponent,
    VerAgremiadosComponent,
    VerSolicitudesComponent,
    AgregarSolicitudesComponent,

    // Carpeta Pages
    FormatosComponent,
    ConvocatoriasComponent,
    ConveniosComponent,

    // Carpeta Shared
    InicioComponent,
    HomeComponent,
    PaginaErrorComponent,

  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }
