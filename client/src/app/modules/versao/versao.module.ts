import { DialogTicketComponent } from './view/cadastro/dialog-ticket/dialog-ticket.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { customHttpProvider } from './../../core/helpers/custom.http';
import { DatePipe } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { PesquisaVersaoComponent } from './view/pesquisa/pesquisa-versao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VersaoRoute } from './versao.route';
import { CadastroVersaoComponent } from './view/cadastro/cadastro-versao.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';
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
  MatSnackBarModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    CadastroVersaoComponent,
    PesquisaVersaoComponent,
    DialogTicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    RouterModule.forRoot(
      VersaoRoute,
      { useHash: true }
    )
  ],
  entryComponents: [DialogTicketComponent],
  exports: [],
  providers: [DatePipe, customHttpProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VersaoModule {
}
