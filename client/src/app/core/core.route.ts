import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthGuard } from './guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

export const CoreRoutes: ModuleWithProviders = RouterModule.forRoot(routes);