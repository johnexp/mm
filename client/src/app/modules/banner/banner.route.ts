import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { CadastroBannerComponent } from './view/cadastro-banner/cadastro-banner.component';
import { PesquisaBannerComponent } from './view/pesquisa-banner/pesquisa-banner.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const BannerRoute: Routes = [
  {
    path: 'cadastros', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'banner', canActivateChild: [AuthGuard], children: [
          { path: '', redirectTo: 'listar', pathMatch: 'full' },
          { path: 'listar', component: PesquisaBannerComponent },
          { path: 'cadastrar', component: CadastroBannerComponent },
          { path: 'editar/:id', component: CadastroBannerComponent },
          { path: 'visualizar/:id', component: CadastroBannerComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
