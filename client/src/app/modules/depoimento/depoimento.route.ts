import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroDepoimentoComponent } from './view/cadastro-depoimento/cadastro-depoimento.component';
import { PesquisaDepoimentoComponent } from './view/pesquisa-depoimento/pesquisa-depoimento.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const DepoimentoRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'depoimento', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaDepoimentoComponent },
          { path: 'cadastrar', component: CadastroDepoimentoComponent },
          { path: 'editar/:id', component: CadastroDepoimentoComponent },
          { path: 'visualizar/:id', component: CadastroDepoimentoComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
