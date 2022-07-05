import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { ListasPreciosComponent } from './pages/listas-precios/listas-precios.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { ReparacionesComponent } from './pages/reparaciones/reparaciones.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'novedades', component: NovedadesComponent },
      { path: 'recetas', component: RecetasComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'listas-precios', component: ListasPreciosComponent },
      { path: 'reparaciones', component: ReparacionesComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
 },
 { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
