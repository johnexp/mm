import { CoreModule } from './../../core/core.module';
import { AssuntoContatoRoute } from './assunto-contato.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroAssuntoContatoComponent } from './view/cadastro-assunto-contato/cadastro-assunto-contato.component';
import { PesquisaAssuntoContatoComponent } from './view/pesquisa-assunto-contato/pesquisa-assunto-contato.component';
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
    CadastroAssuntoContatoComponent,
    PesquisaAssuntoContatoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(AssuntoContatoRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssuntoContatoModule {
}
