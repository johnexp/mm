import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroProdutoServicoComponent } from './view/cadastro-produto-servico/cadastro-produto-servico.component';
import { PesquisaProdutoServicoComponent } from './view/pesquisa-produto-servico/pesquisa-produto-servico.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const ProdutoServicoRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'produto-servico', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaProdutoServicoComponent },
          { path: 'cadastrar', component: CadastroProdutoServicoComponent },
          { path: 'editar/:id', component: CadastroProdutoServicoComponent },
          { path: 'visualizar/:id', component: CadastroProdutoServicoComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
