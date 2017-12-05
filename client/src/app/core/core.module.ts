import { CustomFileUploadComponent } from './util/custom-file-upload/custom-file-upload.component';
import { CoreRoutes } from './core.route';
import { HttpClientModule } from '@angular/common/http';
import { CustomHttp } from './helpers/custom.http';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ImagePreviewComponent } from './util/image-preview/image-preview.component';
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
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';

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
  MatTooltipModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    GenericDatatableComponent,
    ConfirmationDialogComponent,
    ImagePreviewComponent,
    CustomFileUploadComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MAT_MODULES,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    CoreRoutes
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    GenericDatatableComponent,
    ImagePreviewComponent,
    CustomFileUploadComponent
  ],
  providers: [
    CustomSnackBarService,
    AuthGuard,
    AuthenticationService,
    UserService,
    CustomHttp
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
