import { AppSettings } from './app.settings';
import { AssuntoContatoModule } from './modules/assunto-contato/assunto-contato.module';
import { PaginaModule } from './modules/pagina/pagina.module';
import { ApresentacaoPlanosModule } from './modules/apresentacao-planos/apresentacao-planos.module';
import { ItemAreaClienteModule } from './modules/item-area-cliente/item-area-cliente.module';
import { MenuModule } from './modules/menu/menu.module';
import { OperadoraModule } from './modules/operadora/operadora.module';
import { ParceiroModule } from './modules/parceiro/parceiro.module';
import { ProdutoServicoModule } from './modules/produto-servico/produto-servico.module';
import { DepoimentoModule } from './modules/depoimento/depoimento.module';
import { BannerModule } from './modules/banner/banner.module';
import { SobreModule } from './modules/sobre/sobre.module';
import { ApresentacaoSiteModule } from './modules/apresentacao-site/apresentacao-site.module';
import { customHttpProvider } from './core/helpers/custom.http';
import { MatPaginatorIntlPtbr } from './core/util/data-table/mat-paginator-intl-ptbr';
import { CoreModule } from './core/core.module';
import { AppRoutes } from './app.routes';
import { BlockUIModule } from 'ng-block-ui';
import { MatPaginatorIntl, MAT_DATE_LOCALE } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    BlockUIModule,
    HttpModule,
    AppRoutes,
    CoreModule,
    ApresentacaoSiteModule,
    SobreModule,
    BannerModule,
    DepoimentoModule,
    ProdutoServicoModule,
    ParceiroModule,
    OperadoraModule,
    MenuModule,
    ItemAreaClienteModule,
    ApresentacaoPlanosModule,
    PaginaModule,
    AssuntoContatoModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtbr },
    customHttpProvider
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
