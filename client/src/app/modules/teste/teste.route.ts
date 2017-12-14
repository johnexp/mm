import { HomeComponent } from './../../core/components/home/home.component';
import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroTesteComponent } from './view/cadastro-teste/cadastro-teste.component';
import { PesquisaTesteComponent } from './view/pesquisa-teste/pesquisa-teste.component';

export const TesteRoute: Routes = [
  {
    path: 'administracao', children: [
      { path: '', component: HomeComponent },
      {
        path: 'teste', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaTesteComponent },
          { path: 'cadastrar', component: CadastroTesteComponent },
          { path: 'editar/:id', component: CadastroTesteComponent },
          { path: 'visualizar/:id', component: CadastroTesteComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
