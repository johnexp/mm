import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroOperadoraComponent } from './view/cadastro-operadora/cadastro-operadora.component';
import { PesquisaOperadoraComponent } from './view/pesquisa-operadora/pesquisa-operadora.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const OperadoraRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'operadora', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaOperadoraComponent },
          { path: 'cadastrar', component: CadastroOperadoraComponent },
          { path: 'editar/:id', component: CadastroOperadoraComponent },
          { path: 'visualizar/:id', component: CadastroOperadoraComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
