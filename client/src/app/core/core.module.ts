import { CustomSnackBarService } from './util/snack-bar/custom-snack-bar.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './util/dialog/confirmation-dialog.component';
import { GenericDatatableComponent } from './util/data-table/generic-datatable.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatCheckboxModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const MAT_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatCheckboxModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    GenericDatatableComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MAT_MODULES,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    GenericDatatableComponent,
  ],
  providers: [CustomSnackBarService],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
