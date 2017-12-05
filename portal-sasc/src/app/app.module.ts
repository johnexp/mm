import { VersaoModule } from './versao/versao.module';
import { InternalServerErrorComponent } from './layout/internal-server-error/internal-server-error.component';
import { WikiModule } from './wiki/wiki.module';
import { SobreModule } from './sobre/sobre.module';
import { ArquivosModule } from './arquivos/arquivos.module';
import { BlockUIModule } from 'ng-block-ui';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './service/home.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AppRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    InternalServerErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes,
    BlockUIModule,
    HomeModule,
    ArquivosModule,
    SobreModule,
    WikiModule,
    VersaoModule
  ],
  providers: [
    HomeService
  ],
  exports: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
