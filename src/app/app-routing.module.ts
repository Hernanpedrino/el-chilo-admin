import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'clientes', component: ClientesComponent },
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
