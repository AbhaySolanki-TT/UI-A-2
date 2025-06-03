import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { AppRoutes } from './shared/routes-enum';
import { RegisterComponent } from './Component/register/register.component';
import { authGuard } from './core/Guards/auth.guard';

export const routes: Routes = [
    {path:AppRoutes.login, component:LoginComponent, canActivate: []},
    {path:AppRoutes.home, component:HomeComponent, canActivate: [authGuard]},
    {path:AppRoutes.register, component:RegisterComponent, canActivate: []},
];
