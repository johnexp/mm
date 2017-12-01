import { ArquivosComponent } from './arquivos.component';
import { ArquivosService } from './../service/arquivos.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArquivosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    ArquivosService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArquivosModule { }
