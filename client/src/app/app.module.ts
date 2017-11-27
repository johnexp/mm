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
import { ResourceModule } from 'ngx-resource';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
    MAT_MODULES,
    FlexLayoutModule,
    ResourceModule.forRoot(),
    BlockUIModule,
    AppRoutes,
    CoreModule,
    VersaoModule,
    MembroModule,
    HomologacaoModule,
    ApresentacaoSiteModule,
    BannerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtbr },
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
