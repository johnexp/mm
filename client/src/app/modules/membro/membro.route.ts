import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroMembroComponent } from './view/cadastro-membro/cadastro-membro.component';
import { PesquisaMembroComponent } from './view/pesquisa-membro/pesquisa-membro.component';

export const MembroRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'membro', canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaMembroComponent },
          { path: 'cadastrar', component: CadastroMembroComponent },
          { path: 'editar/:id', component: CadastroMembroComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }
    ]
  }
];
