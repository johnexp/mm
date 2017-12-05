import { VerVersaoComponent } from './ver-versao/ver-versao.component';
import { ListaVersaoComponent } from './lista-versao/lista-versao.component';
import { VersaoService } from './../service/versao.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListaVersaoComponent,
    VerVersaoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    VersaoService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VersaoModule { }
