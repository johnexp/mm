import { SobreService } from './../service/sobre.service';
import { SobreComponent } from './sobre.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SobreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    SobreService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SobreModule { }
