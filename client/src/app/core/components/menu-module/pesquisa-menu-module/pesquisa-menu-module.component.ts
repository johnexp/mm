import { MenuModule } from './../../../domain/menu-module';
import { MenuModuleService } from './../../../service/menu-module.service';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-menu-module',
  templateUrl: 'pesquisa-menu-module.component.html',
  styleUrls: ['./pesquisa-menu-module.component.css'],
  providers: [MenuModuleService]
})
export class PesquisaMenuModuleComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [ {
    columnDef: 'name',
    header: 'Nome da Seção',
    cell: (row: MenuModule) => `${row.name}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'label',
    header: 'Label',
    cell: (row: MenuModule) => `${row.label}`,
    filter: true,
    type: 'text'
  }];

  database = new GenericDatabase;


  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private menuModuleService: MenuModuleService) {
  }

  ngOnInit() {
    this.buscarMenuModule();

  }

  buscarMenuModule() {
    this.blockUI.start('Buscando registros...');
    this.menuModuleService.getAll().subscribe(
      menuModule => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = menuModule;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  excluirMenuModule(menuModule: MenuModule, paginator: any) {
    this.blockUI.start('Removendo registro...');
    this.menuModuleService.delete(menuModule._id).subscribe(
      response => {
        this.buscarMenuModule();
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
