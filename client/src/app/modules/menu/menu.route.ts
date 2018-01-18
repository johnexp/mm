import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroMenuComponent } from './view/cadastro-menu/cadastro-menu.component';
import { PesquisaMenuComponent } from './view/pesquisa-menu/pesquisa-menu.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const MenuRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'menu', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaMenuComponent },
          { path: 'cadastrar', component: CadastroMenuComponent },
          { path: 'editar/:id', component: CadastroMenuComponent },
          { path: 'visualizar/:id', component: CadastroMenuComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
