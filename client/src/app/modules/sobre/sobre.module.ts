import { CoreModule } from './../../core/core.module';
import { SobreRoute } from './sobre.route';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroSobrePortalComponent } from './view/cadastro-sobre-portal/cadastro-sobre-portal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatInputModule
} from '@angular/material';

const MAT_MODULES = [
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    CadastroSobrePortalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAT_MODULES,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    RouterModule.forRoot(SobreRoute, { useHash: true })
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SobreModule {
}
