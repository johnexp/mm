import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroHomologacaoComponent } from './view/cadastro-homologacao/cadastro-homologacao.component';
import { PesquisaHomologacaoComponent } from './view/pesquisa-homologacao/pesquisa-homologacao.component';

export const HomologacaoRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'homologacao', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaHomologacaoComponent },
          { path: 'cadastrar', component: CadastroHomologacaoComponent },
          { path: 'editar/:id', component: CadastroHomologacaoComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }
    ]
  }
];
