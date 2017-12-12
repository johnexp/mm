import { Action } from './../../../domain/action';
import { ActionService } from './../../../service/action.service';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-action',
  templateUrl: 'pesquisa-action.component.html',
  styleUrls: ['./pesquisa-action.component.css'],
  providers: [ActionService]
})
export class PesquisaActionComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [ {
      columnDef: 'actionName',
      header: 'Nome da Ação',
      cell: (row: Action) => `${row.actionName}`,
      filter: true,
      type: 'text'
    }, {
      columnDef: 'ativo',
      header: 'Ativo',
      cell: (row: Action) => `${row.ativo ? 'Sim' : 'Não'}`,
      filter: false
    }
  ];

  database = new GenericDatabase;
  filtrarAtivos: Boolean;


  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private actionService: ActionService) {
  }

  ngOnInit() {
    this.buscarActiones();

  }

  buscarActiones() {
    this.blockUI.start('Buscando registros...');
    this.actionService.getAll(this.filtrarAtivos).subscribe(
      actiones => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = actiones;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  mudarAtivacaoAction(action, paginator) {
    const acao = action.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.actionService.delete(action._id).subscribe(
      response => {
        this.buscarActiones();
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
