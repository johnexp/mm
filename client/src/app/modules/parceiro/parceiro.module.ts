import { CoreModule } from './../../core/core.module';
import { ParceiroRoute } from './parceiro.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroParceiroComponent } from './view/cadastro-parceiro/cadastro-parceiro.component';
import { PesquisaParceiroComponent } from './view/pesquisa-parceiro/pesquisa-parceiro.component';
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
  MatCheckboxModule,
  MatSlideToggleModule,
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
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    CadastroParceiroComponent,
    PesquisaParceiroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(ParceiroRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParceiroModule {
}
