import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroWikiComponent } from './view/cadastro-wiki/cadastro-wiki.component';
import { PesquisaWikiComponent } from './view/pesquisa-wiki/pesquisa-wiki.component';

export const WikiRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'wiki', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaWikiComponent },
          { path: 'cadastrar', component: CadastroWikiComponent },
          { path: 'editar/:id', component: CadastroWikiComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }]
  }
];
