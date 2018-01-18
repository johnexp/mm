import { CadastroPaginaDemonstrativoIRComponent } from './view/cadastro-pagina-demonstrativo-ir/cadastro-pagina-demonstrativo-ir.component';
import { CadastroPaginaAreaClienteComponent } from './view/cadastro-pagina-area-cliente/cadastro-pagina-area-cliente.component';
import { CadastroPaginaOperadorasComponent } from './view/cadastro-pagina-operadoras/cadastro-pagina-operadoras.component';
import { CadastroPaginaEntidadesComponent } from './view/cadastro-pagina-entidades/cadastro-pagina-entidades.component';
import { CadastroPaginaDepoimentosComponent } from './view/cadastro-pagina-depoimentos/cadastro-pagina-depoimentos.component';
import { CadastroQuantidadesComponent } from './view/cadastro-quantidades/cadastro-quantidades.component';
import { CadastroPlanosPorAdesaoComponent } from './view/cadastro-planos-por-adesao/cadastro-planos-por-adesao.component';
import { CadastroOQueEComponent } from './view/cadastro-o-que-e/cadastro-o-que-e.component';
import { CadastroSurgimentoValemComponent } from './view/cadastro-surgimento-valem/cadastro-surgimento-valem.component';
import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { NavigationComponent } from './../../core/layout/navigation/navigation.component';
import { HeaderComponent } from './../../core/layout/header/header.component';
import { HomeComponent } from './../../core/components/home/home.component';

export const PaginaRoute: Routes = [
  {
    path: 'paginas', children: [
      { path: '', canActivate: [AuthGuard], component: HomeComponent },
      {
        path: 'surgimento-valem', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroSurgimentoValemComponent },
          { path: ':id', component: CadastroSurgimentoValemComponent },
          { path: 'visualizar/:id', component: CadastroSurgimentoValemComponent }
        ]
      },
      {
        path: 'o-que-e', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroOQueEComponent },
          { path: ':id', component: CadastroOQueEComponent },
          { path: 'visualizar/:id', component: CadastroOQueEComponent }
        ]
      },
      {
        path: 'planos-por-adesao', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroPlanosPorAdesaoComponent },
          { path: ':id', component: CadastroPlanosPorAdesaoComponent },
          { path: 'visualizar/:id', component: CadastroPlanosPorAdesaoComponent }
        ]
      },
      {
        path: 'quantidades', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroQuantidadesComponent },
          { path: ':id', component: CadastroQuantidadesComponent },
          { path: 'visualizar/:id', component: CadastroQuantidadesComponent }
        ]
      },
      {
        path: 'pagina-depoimentos', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroPaginaDepoimentosComponent },
          { path: ':id', component: CadastroPaginaDepoimentosComponent },
          { path: 'visualizar/:id', component: CadastroPaginaDepoimentosComponent }
        ]
      },
      {
        path: 'pagina-entidades', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroPaginaEntidadesComponent },
          { path: ':id', component: CadastroPaginaEntidadesComponent },
          { path: 'visualizar/:id', component: CadastroPaginaEntidadesComponent }
        ]
      },
      {
        path: 'pagina-operadoras', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroPaginaOperadorasComponent },
          { path: ':id', component: CadastroPaginaOperadorasComponent },
          { path: 'visualizar/:id', component: CadastroPaginaOperadorasComponent }
        ]
      },
      {
        path: 'pagina-area-cliente', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroPaginaAreaClienteComponent },
          { path: ':id', component: CadastroPaginaAreaClienteComponent },
          { path: 'visualizar/:id', component: CadastroPaginaAreaClienteComponent }
        ]
      },
      {
        path: 'pagina-demonstrativo-ir', canActivateChild: [AuthGuard], children: [
          { path: '', component: CadastroPaginaDemonstrativoIRComponent },
          { path: ':id', component: CadastroPaginaDemonstrativoIRComponent },
          { path: 'visualizar/:id', component: CadastroPaginaDemonstrativoIRComponent }
        ]
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: NavigationComponent, outlet: 'navigation' }
    ]
  }
];
