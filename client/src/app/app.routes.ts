import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './core/components/register/register.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '**', redirectTo: '', children: [
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
