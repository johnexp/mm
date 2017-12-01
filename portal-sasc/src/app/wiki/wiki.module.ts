import { VerWikiComponent } from './ver-wiki/ver-wiki.component';
import { ListaWikiComponent } from './lista-wiki/lista-wiki.component';
import { WikiService } from './../service/wiki.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListaWikiComponent,
    VerWikiComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    WikiService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WikiModule { }
