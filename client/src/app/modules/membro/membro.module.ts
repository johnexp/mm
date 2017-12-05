import { CoreModule } from './../../core/core.module';
import { MembroRoute } from './membro.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroMembroComponent } from './view/cadastro-membro/cadastro-membro.component';
import { PesquisaMembroComponent } from './view/pesquisa-membro/pesquisa-membro.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatInputModule,
  MatSlideToggleModule,
  MatSelectModule
} from '@angular/material';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    CadastroMembroComponent,
    PesquisaMembroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(MembroRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembroModule {
}
