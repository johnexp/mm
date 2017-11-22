import { AppComponent } from './app.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [{
  path: '**', redirectTo: '', children: [
    { path: '', component: HeaderComponent, outlet: 'header' },
    { path: '', component: NavigationComponent, outlet: 'navigation' }
  ]
}];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
