import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { AppRoutes } from './shared/NavigationRoutes';
import { RegisterComponent } from './Component/register/register.component';
import { authGuard } from './core/Guards/auth.guard';
import { UserComponent } from './Component/user/user.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { RolesComponent } from './Component/roles/roles.component';
import { TimeSlotComponent } from './Component/timeslot/timeslot.component';

export const routes: Routes = [
    {path:AppRoutes.login, component:LoginComponent, canActivate: []},
        {path:AppRoutes.home, component:HomeComponent, canActivate: [authGuard], 
            children: [
            {path: AppRoutes.dashboard, component:DashboardComponent},
            {path: AppRoutes.users, component:UserComponent},
            {path: AppRoutes.roles, component:RolesComponent},
            {path: AppRoutes.timeslots, component:TimeSlotComponent},
        ]},
    {path:AppRoutes.register, component:RegisterComponent, canActivate: []},
];
