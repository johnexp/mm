import { CoreModule } from './../../core/core.module';
import { ItemProgressoRoute } from './item-progresso.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroItemProgressoComponent } from './view/cadastro-item-progresso/cadastro-item-progresso.component';
import { PesquisaItemProgressoComponent } from './view/pesquisa-item-progresso/pesquisa-item-progresso.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatInputModule,
  MatSliderModule
} from '@angular/material';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatInputModule,
  MatSliderModule
];

@NgModule({
  declarations: [
    CadastroItemProgressoComponent,
    PesquisaItemProgressoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(ItemProgressoRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemProgressoModule {
}
