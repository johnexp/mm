import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroApresentacaoSiteComponent } from './view/cadastro-apresentacao-site/cadastro-apresentacao-site.component';

export const ApresentacaoSiteRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'apresentacao-site', canActivate: [AuthGuard], children: [
          { path: '', component: CadastroApresentacaoSiteComponent },
          { path: ':id', component: CadastroApresentacaoSiteComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }
    ]
  }
];
