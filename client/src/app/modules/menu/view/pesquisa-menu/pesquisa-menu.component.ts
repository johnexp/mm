import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { MenuService } from './../../service/menu.service';
import { Menu } from './../../domain/menu';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-menu',
  templateUrl: 'pesquisa-menu.component.html',
  styleUrls: ['./pesquisa-menu.component.css'],
  providers: [MenuService]
})
export class PesquisaMenuComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'label',
    header: 'Label',
    cell: (row: Menu) => `${row.label || ''}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'externo',
    header: 'Externo',
    cell: (row: Menu) => `${row.externo ? 'Sim' : 'Não'}`,
    filter: true,
    type: 'checkbox'
  }, {
    columnDef: 'endereco',
    header: 'Endereço',
    cell: (row: Menu) => `${row.endereco || ''}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'ordem',
    header: 'Ordem',
    cell: (row: Menu) => `${row.ordem || ''}`,
    filter: false,
    type: 'number'
  }];

  database = new GenericDatabase;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private menuService: MenuService) {
  }

  ngOnInit() {
    this.buscarMenus();

  }

  buscarMenus() {
    this.blockUI.start('Buscando registros...');
    this.menuService.getAll().subscribe(
      menus => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = menus;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  excluirMenu(menu, paginator) {
    this.blockUI.start('Removendo registro...');
    this.menuService.delete(menu._id).subscribe(
      response => {
        this.buscarMenus();
        paginator.pageIndex = 0;
        paginator.page.emit();
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
