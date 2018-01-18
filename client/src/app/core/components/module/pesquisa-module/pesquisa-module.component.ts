import { ModuleService } from './../../../service/module.service';
import { Module } from './../../../domain/module';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-module',
  templateUrl: 'pesquisa-module.component.html',
  styleUrls: ['./pesquisa-module.component.css'],
  providers: [ModuleService]
})
export class PesquisaModuleComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'moduleName',
    header: 'Nome do Módulo',
    cell: (row: Module) => `${row.moduleName}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: Module) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];
  database = new GenericDatabase;
  filtrarAtivos: Boolean;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private moduleService: ModuleService) {
  }

  ngOnInit() { }

  mudarAtivacaoModule(module: Module, paginator: any) {
    const acao = module.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.moduleService.delete(module._id).subscribe(
      response => {
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
