import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { RecetasComponent } from './recetas/recetas.component';
import { ListasPreciosComponent } from './listas-precios/listas-precios.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';



@NgModule({
  declarations: [
    HomeComponent,
    ClientesComponent,
    MainComponent,
    LoginComponent,
    ReparacionesComponent,
    NovedadesComponent,
    RecetasComponent,
    ListasPreciosComponent,
    NotificacionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports:[
    HomeComponent,
    ClientesComponent,
    LoginComponent,
  ]
})
export class PagesModule { }
