import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroTesteComponent } from './view/cadastro-teste/cadastro-teste.component';
import { PesquisaTesteComponent } from './view/pesquisa-teste/pesquisa-teste.component';

export const TesteRoute: Routes = [
  {
    path: 'teste', canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', canActivate: [AuthGuard], component: PesquisaTesteComponent },
      { path: 'cadastrar', canActivate: [AuthGuard], component: CadastroTesteComponent },
      { path: 'editar/:id', canActivate: [AuthGuard], component: CadastroTesteComponent },
      { path: 'visualizar/:id', canActivate: [AuthGuard], component: CadastroTesteComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
