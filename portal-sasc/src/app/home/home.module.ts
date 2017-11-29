import { ProgressoComponent } from './progresso/progresso.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeService } from './../service/home.service';
import { BannerComponent } from './banner/banner.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ProgressoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    HomeService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
