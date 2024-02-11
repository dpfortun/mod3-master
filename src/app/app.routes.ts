import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NuevoUsuarioComponent } from './components/dashboard/nuevo-usuario/nuevo-usuario.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'nuevo', component: NuevoUsuarioComponent},
    {path: '**', redirectTo: '/login' }
];
