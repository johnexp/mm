import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroParceiroComponent } from './view/cadastro-parceiro/cadastro-parceiro.component';
import { PesquisaParceiroComponent } from './view/pesquisa-parceiro/pesquisa-parceiro.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const ParceiroRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'parceiro', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaParceiroComponent },
          { path: 'cadastrar', component: CadastroParceiroComponent },
          { path: 'editar/:id', component: CadastroParceiroComponent },
          { path: 'visualizar/:id', component: CadastroParceiroComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
