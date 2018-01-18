import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { DialogSubmenuComponent } from './dialog-submenu/dialog-submenu.component';
import { MatDialog } from '@angular/material';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Menu } from './../../domain/menu';
import { MenuService } from './../../service/menu.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-menu',
  templateUrl: 'cadastro-menu.component.html',
  styleUrls: ['./cadastro-menu.component.css'],
  providers: [MenuService]
})
export class CadastroMenuComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  menu: Menu = new Menu;
  @ViewChild('form') form;
  disabled: Boolean = false;
  databaseSubmenus = new GenericDatabase;
  displayedSubmenusColumns = [
    { columnDef: 'label', header: 'Label', cell: (row: Menu) => `${row.label}` },
    { columnDef: 'ordem', header: 'Ordem', cell: (row: Menu) => `${row.ordem}` },
    { columnDef: 'endereco', header: 'Endereço', cell: (row: Menu) => `${row.endereco}` }
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private menuService: MenuService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterMenu(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterMenu(id) {
    this.blockUI.start('Carregando...');
    this.menuService.get(id).subscribe(
      response => {
        this.menu = response;
        this.menu.submenus = this.menu.submenus || [];
        this.databaseSubmenus = new GenericDatabase;
        this.databaseSubmenus.data = this.menu.submenus;
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open(error, 'danger');
        this.blockUI.stop();
      }
    );
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Salvando...');
    this.menuService.createOrUpdate(this.menu).subscribe(
      menu => {
        this.blockUI.stop();
        if (!this.menu._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/menu']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/menu']);
  }

  abrirDialogSubmenu(submenu?: Menu): void {
    if (!submenu) {
      submenu = new Menu;
    } else {
      // clona o submenu para não editar o objeto no grid
      submenu = JSON.parse(JSON.stringify(submenu));
    }
    const dialogRef = this.dialog.open(DialogSubmenuComponent, {
      width: '400px',
      data: { submenu: submenu }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adicionarSubmenu(result);
      }
    });
  }

  adicionarSubmenu(submenu: Menu) {
    if (submenu._id == null) {
      submenu._id = '___' + Math.random().toString(36).substring(7);
      this.menu.submenus.push(submenu);
    } else {
      const indexSubmenuAlterado = this.menu.submenus.findIndex(submenuExistente => submenu._id === submenuExistente._id);
      this.menu.submenus.splice(indexSubmenuAlterado, 1);
      this.databaseSubmenus = new GenericDatabase;
      this.databaseSubmenus.data = this.menu.submenus;
      this.changeDetectorRef.detectChanges();
      this.menu.submenus.splice(indexSubmenuAlterado, 0, submenu);
    }
    this.databaseSubmenus = new GenericDatabase;
    this.databaseSubmenus.data = this.menu.submenus;
  }

  removerSubmenu(idSubmenu) {
    const index = this.menu.submenus.findIndex(submenu => submenu._id === idSubmenu);
    this.menu.submenus.splice(index, 1);
    this.databaseSubmenus = new GenericDatabase;
    this.databaseSubmenus.data = this.menu.submenus;
  }

}
