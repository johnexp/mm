import { PermissionService } from '../../../service/permission.service';
import { Action } from '../../../domain/action';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { Permission } from '../../../domain/permission';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Module } from '../../../domain/module';

@Component({
  selector: 'app-pesquisa-permission',
  templateUrl: 'pesquisa-permission.component.html',
  styleUrls: ['./pesquisa-permission.component.css'],
  providers: [PermissionService]
})
export class PesquisaPermissionComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [ {
      columnDef: 'action',
      header: 'Ação',
      cell: (row: Permission) => `${row.action ? row.action.actionName : ''}`,
      filter: true,
      type: 'entity'
    }, {
      columnDef: 'module',
      header: 'Módulo',
      cell: (row: Permission) => `${row.module ? row.module.moduleName : ''}`,
      filter: true,
      type: 'entity'
    }, {
      columnDef: 'ativo',
      header: 'Ativo',
      cell: (row: Permission) => `${row.ativo ? 'Sim' : 'Não'}`,
      filter: false
    }
  ];

  actionSelectionColumns = [{
    columnDef: 'actionName',
    header: 'Nome da Ação',
    cell: (row: Action) => `${row.actionName}`,
    filter: true,
    type: 'text'
  }];
  moduleSelectionColumns = [{
    columnDef: 'moduleName',
    header: 'Nome do Módulo',
    cell: (row: Module) => `${row.moduleName}`,
    filter: true,
    type: 'text'
  }];
  database = new GenericDatabase;
  filtrarAtivos: Boolean;


  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
  }

  mudarAtivacaoPermission(permission: Permission, paginator: any) {
    const acao = permission.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.permissionService.delete(permission._id).subscribe(
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
