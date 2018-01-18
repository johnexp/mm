import { QuillModule } from 'ngx-quill';
import { RichTextFieldComponent } from './util/rich-text-field/rich-text-field.component';
import { PesquisaParamComponent } from './components/param/pesquisa-param/pesquisa-param.component';
import { CadastroParamComponent } from './components/param/cadastro-param/cadastro-param.component';
import { DeniedComponent } from './components/denied/denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PesquisaRoleComponent } from './components/role/pesquisa-role/pesquisa-role.component';
import { CadastroRoleComponent } from './components/role/cadastro-role/cadastro-role.component';
import { CadastroUserComponent } from './components/user/cadastro-user/cadastro-user.component';
import { PesquisaUserComponent } from './components/user/pesquisa-user/pesquisa-user.component';
import { MenuModuleService } from './service/menu-module.service';
import { DialogMenuComponent } from './components/menu-module/cadastro-menu-module/dialog-menu/dialog-menu.component';
import { PesquisaMenuModuleComponent } from './components/menu-module/pesquisa-menu-module/pesquisa-menu-module.component';
import { CadastroMenuModuleComponent } from './components/menu-module/cadastro-menu-module/cadastro-menu-module.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PesquisaPermissionComponent } from './components/permission/pesquisa-permission/pesquisa-permission.component';
import { CadastroPermissionComponent } from './components/permission/cadastro-permission/cadastro-permission.component';
import { PesquisaModuleComponent } from './components/module/pesquisa-module/pesquisa-module.component';
import { CadastroModuleComponent } from './components/module/cadastro-module/cadastro-module.component';
import { PesquisaActionComponent } from './components/action/pesquisa-action/pesquisa-action.component';
import { CadastroActionComponent } from './components/action/cadastro-action/cadastro-action.component';
import { DialogEntitySelectionComponent } from './util/select-entity-field/dialog-entity-selection/dialog-entity-selection.component';
import { SelectEntityFieldComponent } from './util/select-entity-field/select-entity-field.component';
import { CheckboxMultipleComponent } from './util/checkbox-multiple/checkbox-multiple.component';
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
import { NavigationComponent } from './layout/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
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
  MatSelectModule,
  MatSlideToggleModule,
  MatRadioModule
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
  MatSelectModule,
  MatSlideToggleModule,
  MatRadioModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    GenericDatatableComponent,
    ConfirmationDialogComponent,
    ImagePreviewComponent,
    CustomFileUploadComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    DeniedComponent,
    CheckboxMultipleComponent,
    SelectEntityFieldComponent,
    DialogEntitySelectionComponent,
    RichTextFieldComponent,
    CadastroActionComponent,
    PesquisaActionComponent,
    CadastroModuleComponent,
    PesquisaModuleComponent,
    CadastroParamComponent,
    PesquisaParamComponent,
    CadastroPermissionComponent,
    PesquisaPermissionComponent,
    UserInfoComponent,
    CadastroMenuModuleComponent,
    PesquisaMenuModuleComponent,
    DialogMenuComponent,
    CadastroUserComponent,
    PesquisaUserComponent,
    CadastroRoleComponent,
    PesquisaRoleComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MAT_MODULES,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    QuillModule,
    CoreRoutes
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    GenericDatatableComponent,
    ImagePreviewComponent,
    CustomFileUploadComponent,
    CheckboxMultipleComponent,
    SelectEntityFieldComponent,
    RichTextFieldComponent
  ],
  providers: [
    CustomSnackBarService,
    MenuModuleService,
    AuthGuard,
    AuthenticationService,
    UserService,
    CustomHttp,
    DatePipe
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    DialogEntitySelectionComponent,
    DialogMenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
