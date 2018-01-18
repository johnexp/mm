import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroAssuntoContatoComponent } from './view/cadastro-assunto-contato/cadastro-assunto-contato.component';
import { PesquisaAssuntoContatoComponent } from './view/pesquisa-assunto-contato/pesquisa-assunto-contato.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const AssuntoContatoRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'assunto-contato', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaAssuntoContatoComponent },
          { path: 'cadastrar', component: CadastroAssuntoContatoComponent },
          { path: 'editar/:id', component: CadastroAssuntoContatoComponent },
          { path: 'visualizar/:id', component: CadastroAssuntoContatoComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
