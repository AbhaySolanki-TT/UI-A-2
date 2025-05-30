import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { authGuard } from './core/Guards/auth.guard';
import { HomeComponent } from './Component/home/home.component';
import { doubleLoginGuard } from './core/Guards/double-login.guard';
import { AppRoutes } from './shared/routes-enum';
import { LogoutComponent } from './Component/logout/logout.component';

export const routes: Routes = [
    {path:AppRoutes.login, component:LoginComponent, canActivate: [authGuard]},
    {path:AppRoutes.home, component:HomeComponent, canActivate: [doubleLoginGuard]},
];
