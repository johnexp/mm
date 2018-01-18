import { DialogSubmenuComponent } from './view/cadastro-menu/dialog-submenu/dialog-submenu.component';
import { CoreModule } from './../../core/core.module';
import { MenuRoute } from './menu.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroMenuComponent } from './view/cadastro-menu/cadastro-menu.component';
import { PesquisaMenuComponent } from './view/pesquisa-menu/pesquisa-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatSliderModule,
  MatRadioModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatSliderModule,
  MatRadioModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    CadastroMenuComponent,
    PesquisaMenuComponent,
    DialogSubmenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(MenuRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  entryComponents: [
    DialogSubmenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule {
}
