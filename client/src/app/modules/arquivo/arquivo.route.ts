import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroArquivoComponent } from './view/cadastro-arquivo/cadastro-arquivo.component';
import { PesquisaArquivoComponent } from './view/pesquisa-arquivo/pesquisa-arquivo.component';

export const ArquivoRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'arquivo', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaArquivoComponent },
          { path: 'cadastrar', component: CadastroArquivoComponent },
          { path: 'editar/:id', component: CadastroArquivoComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }]
  }
];
