import { CadastroPaginaDemonstrativoIRComponent } from './view/cadastro-pagina-demonstrativo-ir/cadastro-pagina-demonstrativo-ir.component';
import { CadastroPaginaAreaClienteComponent } from './view/cadastro-pagina-area-cliente/cadastro-pagina-area-cliente.component';
import { CadastroPaginaEntidadesComponent } from './view/cadastro-pagina-entidades/cadastro-pagina-entidades.component';
import { CadastroPaginaOperadorasComponent } from './view/cadastro-pagina-operadoras/cadastro-pagina-operadoras.component';
import { CadastroPaginaDepoimentosComponent } from './view/cadastro-pagina-depoimentos/cadastro-pagina-depoimentos.component';
import { CadastroQuantidadesComponent } from './view/cadastro-quantidades/cadastro-quantidades.component';
import { CadastroPlanosPorAdesaoComponent } from './view/cadastro-planos-por-adesao/cadastro-planos-por-adesao.component';
import { CadastroOQueEComponent } from './view/cadastro-o-que-e/cadastro-o-que-e.component';
import { CadastroSurgimentoValemComponent } from './view/cadastro-surgimento-valem/cadastro-surgimento-valem.component';
import { CoreModule } from './../../core/core.module';
import { PaginaRoute } from './pagina.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroPaginaComponent } from './view/cadastro-pagina/cadastro-pagina.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatSliderModule,
  MatRadioModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatSliderModule,
  MatRadioModule,
  MatInputModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    CadastroPaginaComponent,
    CadastroSurgimentoValemComponent,
    CadastroOQueEComponent,
    CadastroPlanosPorAdesaoComponent,
    CadastroQuantidadesComponent,
    CadastroPaginaDepoimentosComponent,
    CadastroPaginaOperadorasComponent,
    CadastroPaginaEntidadesComponent,
    CadastroPaginaAreaClienteComponent,
    CadastroPaginaDemonstrativoIRComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(PaginaRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginaModule {
}
