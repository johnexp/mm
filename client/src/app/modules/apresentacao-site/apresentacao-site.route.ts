import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroApresentacaoSiteComponent } from './view/cadastro-apresentacao-site/cadastro-apresentacao-site.component';

export const ApresentacaoSiteRoute: Routes = [
  {
    path: 'apresentacao-site', children: [
      { path: '', component: CadastroApresentacaoSiteComponent },
      { path: ':id', component: CadastroApresentacaoSiteComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
