import { HomeComponent } from './../../core/components/home/home.component';
import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroItemProgressoComponent } from './view/cadastro-item-progresso/cadastro-item-progresso.component';
import { PesquisaItemProgressoComponent } from './view/pesquisa-item-progresso/pesquisa-item-progresso.component';

export const ItemProgressoRoute: Routes = [
  {
    path: 'cadastros', canActivateChild: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      {
        path: 'item-progresso', children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaItemProgressoComponent },
          { path: 'cadastrar', component: CadastroItemProgressoComponent },
          { path: 'editar/:id', component: CadastroItemProgressoComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
