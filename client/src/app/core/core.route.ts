import { UserInfoComponent } from './components/user-info/user-info.component';
import { CadastroPermissionComponent } from './components/permission/cadastro-permission/cadastro-permission.component';
import { PesquisaPermissionComponent } from './components/permission/pesquisa-permission/pesquisa-permission.component';
import { CadastroModuleComponent } from './components/module/cadastro-module/cadastro-module.component';
import { PesquisaModuleComponent } from './components/module/pesquisa-module/pesquisa-module.component';
import { CadastroActionComponent } from './components/action/cadastro-action/cadastro-action.component';
import { PesquisaActionComponent } from './components/action/pesquisa-action/pesquisa-action.component';
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
  {
    path: 'administracao', children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      {
        path: 'user', children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: UserInfoComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      },
      {
        path: 'action', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaActionComponent },
          { path: 'cadastrar', component: CadastroActionComponent },
          { path: 'editar/:id', component: CadastroActionComponent },
          { path: 'visualizar/:id', component: CadastroActionComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      },
      {
        path: 'module', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaModuleComponent },
          { path: 'cadastrar', component: CadastroModuleComponent },
          { path: 'editar/:id', component: CadastroModuleComponent },
          { path: 'visualizar/:id', component: CadastroModuleComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      },
      {
        path: 'permission', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaPermissionComponent },
          { path: 'cadastrar', component: CadastroPermissionComponent },
          { path: 'editar/:id', component: CadastroPermissionComponent },
          { path: 'visualizar/:id', component: CadastroPermissionComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }
    ]
  }
];

export const CoreRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
