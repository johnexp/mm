import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroItemAreaClienteComponent } from './view/cadastro-item-area-cliente/cadastro-item-area-cliente.component';
import { PesquisaItemAreaClienteComponent } from './view/pesquisa-item-area-cliente/pesquisa-item-area-cliente.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const ItemAreaClienteRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'item-area-cliente', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaItemAreaClienteComponent },
          { path: 'cadastrar', component: CadastroItemAreaClienteComponent },
          { path: 'editar/:id', component: CadastroItemAreaClienteComponent },
          { path: 'visualizar/:id', component: CadastroItemAreaClienteComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
