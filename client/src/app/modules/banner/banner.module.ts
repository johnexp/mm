import { DialogBotaoComponent } from './view/cadastro-banner/dialog-botao/dialog-botao.component';
import { CoreModule } from './../../core/core.module';
import { BannerRoute } from './banner.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroBannerComponent } from './view/cadastro-banner/cadastro-banner.component';
import { PesquisaBannerComponent } from './view/pesquisa-banner/pesquisa-banner.component';
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
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule
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
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    CadastroBannerComponent,
    PesquisaBannerComponent,
    DialogBotaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(BannerRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  entryComponents: [
    DialogBotaoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerModule {
}
