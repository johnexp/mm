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
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'arquivos', children: [
      { path: '', component: ArquivosComponent },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'sobre', children: [
      { path: '', component: SobreComponent },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'wiki', children: [
      { path: '', component: ListaWikiComponent },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'wiki/:id', children: [
      { path: '', component: VerWikiComponent },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  { path: '500', redirectTo: '' },
  { path: '**', redirectTo: '' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
