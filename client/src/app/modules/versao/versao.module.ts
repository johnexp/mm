import { DatePipe } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { PesquisaVersaoComponent } from './view/pesquisa/pesquisa-versao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VersaoRoute } from './versao.route';
import { CadastroVersaoComponent } from './view/cadastro/cadastro-versao.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule, 
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    CadastroVersaoComponent,
    PesquisaVersaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      VersaoRoute,
      { useHash: true }
    )
  ],
  exports: [],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VersaoModule {
}
