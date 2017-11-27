import { CoreModule } from './../../core/core.module';
import { WikiRoute } from './wiki.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroWikiComponent } from './view/cadastro-wiki/cadastro-wiki.component';
import { PesquisaWikiComponent } from './view/pesquisa-wiki/pesquisa-wiki.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatInputModule
} from '@angular/material';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatInputModule
];

@NgModule({
  declarations: [
    CadastroWikiComponent,
    PesquisaWikiComponent
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
    RouterModule.forRoot(WikiRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WikiModule {
}
