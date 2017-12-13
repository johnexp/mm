import { AuthGuard } from './../../core/guard/auth.guard';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroVersaoComponent } from './view/cadastro/cadastro-versao.component';
import { PesquisaVersaoComponent } from './view/pesquisa/pesquisa-versao.component';

export const VersaoRoute = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'versoes', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaVersaoComponent },
          { path: 'cadastrar', component: CadastroVersaoComponent },
          { path: 'editar/:id', component: CadastroVersaoComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }]
  }
];
