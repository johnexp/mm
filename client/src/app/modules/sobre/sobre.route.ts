import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroSobrePortalComponent } from './view/cadastro-sobre-portal/cadastro-sobre-portal.component';

export const SobreRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'sobre', canActivate: [AuthGuard], children: [
          { path: '', component: CadastroSobrePortalComponent },
          { path: ':id', component: CadastroSobrePortalComponent },
          { path: '', component: HeaderComponent, outlet: 'header' },
          { path: '', component: NavigationComponent, outlet: 'navigation' }
        ]
      }
    ]
  }
];
