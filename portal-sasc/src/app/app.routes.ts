import { VerVersaoComponent } from './versao/ver-versao/ver-versao.component';
import { ListaVersaoComponent } from './versao/lista-versao/lista-versao.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InternalServerErrorComponent } from './layout/internal-server-error/internal-server-error.component';
import { VerWikiComponent } from './wiki/ver-wiki/ver-wiki.component';
import { ListaWikiComponent } from './wiki/lista-wiki/lista-wiki.component';
import { SobreComponent } from './sobre/sobre.component';
import { ArquivosComponent } from './arquivos/arquivos.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: HomeComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'arquivos', children: [
      { path: '', component: ArquivosComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'sobre', children: [
      { path: '', component: SobreComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'wiki', children: [
      { path: '', component: ListaWikiComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'wiki/:id', children: [
      { path: '', component: VerWikiComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'versoes', children: [
      { path: '', component: ListaVersaoComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'versoes/:id', children: [
      { path: '', component: VerVersaoComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  { path: '500', component: InternalServerErrorComponent },
  { path: '**', redirectTo: '' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
