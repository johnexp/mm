import { Action } from './../../../domain/action';
import { ActionService } from './../../../service/action.service';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
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
  displayedColumns = [{
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
  }];

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

  mudarAtivacaoAction(action: Action, paginator: any) {
    const acao = action.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.actionService.delete(action._id).subscribe(
      response => {
        action.ativo = !action.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
