import { TesteModule } from './modules/teste/teste.module';
import { SobreModule } from './modules/sobre/sobre.module';
import { ArquivoModule } from './modules/arquivo/arquivo.module';
import { WikiModule } from './modules/wiki/wiki.module';
import { ItemProgressoModule } from './modules/item-progresso/item-progresso.module';
import { HttpModule } from '@angular/http';
import { customHttpProvider, CustomHttp } from './core/helpers/custom.http';
import { BannerModule } from './modules/banner/banner.module';
import { ApresentacaoSiteModule } from './modules/apresentacao-site/apresentacao-site.module';
import { HomologacaoModule } from './modules/homologacao/homologacao.module';
import { MembroModule } from './modules/membro/membro.module';
import { MatPaginatorIntlPtbr } from './core/util/data-table/mat-paginator-intl-ptbr';
import { VersaoModule } from './modules/versao/versao.module';
import { CoreModule } from './core/core.module';
import { AppRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';

import { AppComponent } from './app.component';
import 'hammerjs';

const MAT_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MAT_MODULES,
    FlexLayoutModule,
    BlockUIModule,
    HttpModule,
    AppRoutes,
    CoreModule,
    VersaoModule,
    MembroModule,
    HomologacaoModule,
    ApresentacaoSiteModule,
    BannerModule,
    ItemProgressoModule,
    WikiModule,
    ArquivoModule,
    SobreModule,
    TesteModule
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
