import { MatDialog } from '@angular/material';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { DialogMenuComponent } from './dialog-menu/dialog-menu.component';
import { MenuModuleService } from './../../../service/menu-module.service';
import { MenuModule } from './../../../domain/menu-module';
import { Menu } from './../../../domain/menu';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-menu-module',
  templateUrl: 'cadastro-menu-module.component.html',
  styleUrls: ['./cadastro-menu-module.component.css'],
  providers: [MenuModuleService]
})
export class CadastroMenuModuleComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('form') form;
  menuModule: MenuModule = new MenuModule;
  databaseMenus = new GenericDatabase;
  disabled: Boolean = false;
  displayedMenusColumns = [
    { columnDef: 'label', header: 'Label', cell: (row: Menu) => `${row.label}` },
    { columnDef: 'icon', header: 'Ícone', cell: (row: Menu) => `${row.icon}` },
    { columnDef: 'path', header: 'Caminho', cell: (row: Menu) => `${row.path}` }
  ];
  rolesLista: string[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private menuModuleService: MenuModuleService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterMenuModule(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    this.obterValoresEnum('roles').then((values) => {
      this.rolesLista = values;
    });
  }

  obterMenuModule(id) {
    this.blockUI.start('Carregando...');
    this.menuModuleService.get(id).subscribe(
      response => {
        this.menuModule = response;
        this.menuModule.menus = this.menuModule.menus || [];
        this.databaseMenus = new GenericDatabase;
        this.databaseMenus.data = this.menuModule.menus;
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open(error, 'danger');
        this.blockUI.stop();
      }
    );
  }

  obterValoresEnum(campo) {
    return this.menuModuleService.getEnum(campo).toPromise();
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Salvando...');
    this.menuModuleService.createOrUpdate(this.menuModule).subscribe(
      menuModule => {
        this.blockUI.stop();
        if (!this.menuModule._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['administracao/menu-module']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/menu-module']);
  }

  abrirDialogMenu(menu?: Menu): void {
    if (!menu) {
      menu = new Menu;
    } else {
      // clona o botão para não editar o objeto no grid
      menu = JSON.parse(JSON.stringify(menu));
    }
    const dialogRef = this.dialog.open(DialogMenuComponent, {
      width: '400px',
      data: { menu: menu }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adicionarMenu(result);
      }
    });
  }

  adicionarMenu(menu: Menu) {
    if (menu._id == null) {
      menu._id = '___' + Math.random().toString(36).substring(7);
      this.menuModule.menus.push(menu);
    } else {
      const indexMenuAlterado = this.menuModule.menus.findIndex(menuExistente => menu._id === menuExistente._id);
      this.menuModule.menus.splice(indexMenuAlterado, 1);
      this.databaseMenus = new GenericDatabase;
      this.databaseMenus.data = this.menuModule.menus;
      this.changeDetectorRef.detectChanges();
      this.menuModule.menus.splice(indexMenuAlterado, 0, menu);
    }
    this.databaseMenus = new GenericDatabase;
    this.databaseMenus.data = this.menuModule.menus;
  }

  removerMenu(idMenu) {
    const index = this.menuModule.menus.findIndex(menu => menu._id === idMenu);
    this.menuModule.menus.splice(index, 1);
    this.databaseMenus = new GenericDatabase;
    this.databaseMenus.data = this.menuModule.menus;
  }

}
