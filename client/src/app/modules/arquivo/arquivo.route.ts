import { HomeComponent } from './../../core/components/home/home.component';
import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroArquivoComponent } from './view/cadastro-arquivo/cadastro-arquivo.component';
import { PesquisaArquivoComponent } from './view/pesquisa-arquivo/pesquisa-arquivo.component';

export const ArquivoRoute: Routes = [
  {
    path: 'cadastros', canActivateChild: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      {
        path: 'arquivo', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaArquivoComponent },
          { path: 'cadastrar', component: CadastroArquivoComponent },
          { path: 'editar/:id', component: CadastroArquivoComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
