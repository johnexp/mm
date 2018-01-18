import { CadastroParamComponent } from './components/param/cadastro-param/cadastro-param.component';
import { PesquisaParamComponent } from './components/param/pesquisa-param/pesquisa-param.component';
import { DeniedComponent } from './components/denied/denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CadastroRoleComponent } from './components/role/cadastro-role/cadastro-role.component';
import { PesquisaRoleComponent } from './components/role/pesquisa-role/pesquisa-role.component';
import { CadastroUserComponent } from './components/user/cadastro-user/cadastro-user.component';
import { PesquisaUserComponent } from './components/user/pesquisa-user/pesquisa-user.component';
import { CadastroMenuModuleComponent } from './components/menu-module/cadastro-menu-module/cadastro-menu-module.component';
import { PesquisaMenuModuleComponent } from './components/menu-module/pesquisa-menu-module/pesquisa-menu-module.component';
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
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'denied', children: [
      { path: '', component: DeniedComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  },
  {
    path: 'administracao', canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      {
        path: 'user', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'info', component: UserInfoComponent },
          { path: 'listar', component: PesquisaUserComponent },
          { path: 'cadastrar', component: CadastroUserComponent },
          { path: 'editar/:id', component: CadastroUserComponent },
          { path: 'visualizar/:id', component: CadastroUserComponent }
        ]
      },
      {
        path: 'action', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaActionComponent },
          { path: 'cadastrar', component: CadastroActionComponent },
          { path: 'editar/:id', component: CadastroActionComponent },
          { path: 'visualizar/:id', component: CadastroActionComponent }
        ]
      },
      {
        path: 'module', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaModuleComponent },
          { path: 'cadastrar', component: CadastroModuleComponent },
          { path: 'editar/:id', component: CadastroModuleComponent },
          { path: 'visualizar/:id', component: CadastroModuleComponent }
        ]
      },
      {
        path: 'param', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaParamComponent },
          { path: 'cadastrar', component: CadastroParamComponent },
          { path: 'editar/:id', component: CadastroParamComponent },
          { path: 'visualizar/:id', component: CadastroParamComponent }
        ]
      },
      {
        path: 'role', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaRoleComponent },
          { path: 'cadastrar', component: CadastroRoleComponent },
          { path: 'editar/:id', component: CadastroRoleComponent },
          { path: 'visualizar/:id', component: CadastroRoleComponent }
        ]
      },
      {
        path: 'permission', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaPermissionComponent },
          { path: 'cadastrar', component: CadastroPermissionComponent },
          { path: 'editar/:id', component: CadastroPermissionComponent },
          { path: 'visualizar/:id', component: CadastroPermissionComponent }
        ]
      },
      {
        path: 'menu-module', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaMenuModuleComponent },
          { path: 'cadastrar', component: CadastroMenuModuleComponent },
          { path: 'editar/:id', component: CadastroMenuModuleComponent },
          { path: 'visualizar/:id', component: CadastroMenuModuleComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];

export const CoreRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
