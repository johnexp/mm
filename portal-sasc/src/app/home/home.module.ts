import { ContatoComponent } from './contato/contato.component';
import { HomologacaoComponent } from './homologacao/homologacao.component';
import { TimeComponent } from './time/time.component';
import { VersoesComponent } from './versoes/versoes.component';
import { ProgressoComponent } from './progresso/progresso.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeService } from './../service/home.service';
import { BannerComponent } from './banner/banner.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ProgressoComponent,
    VersoesComponent,
    TimeComponent,
    HomologacaoComponent,
    ContatoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    HomeService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
