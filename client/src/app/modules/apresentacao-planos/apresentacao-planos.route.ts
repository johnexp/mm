import { HomeComponent } from './../../core/components/home/home.component';
import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroApresentacaoPlanosComponent } from './view/cadastro-apresentacao-planos/cadastro-apresentacao-planos.component';

export const ApresentacaoPlanosRoute: Routes = [
  {
    path: 'cadastros', canActivateChild: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      {
        path: 'apresentacao-planos', children: [
          { path: '', component: CadastroApresentacaoPlanosComponent },
          { path: ':id', component: CadastroApresentacaoPlanosComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
