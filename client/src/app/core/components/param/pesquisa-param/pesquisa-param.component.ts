import { ParamService } from './../../../service/param.service';
import { Param } from './../../../domain/param';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-param',
  templateUrl: 'pesquisa-param.component.html',
  styleUrls: ['./pesquisa-param.component.css'],
  providers: [ParamService]
})
export class PesquisaParamComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'key',
    header: 'Chave',
    cell: (row: Param) => `${row.key}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'value',
    header: 'Valor',
    cell: (row: Param) => `${row.value}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'description',
    header: 'Descrição',
    cell: (row: Param) => `${row.description}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: Param) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];
  database = new GenericDatabase;
  filtrarAtivos: Boolean;
  canCreate: Boolean = false;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private paramService: ParamService) {
  }

  ngOnInit() {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
      if (currentUser.roles.indexOf('admin') > -1) {
        this.canCreate = true;
      }
    } catch (e) {
      this.canCreate = false;
    }
  }

  mudarAtivacaoParam(param: Param, paginator: any) {
    const acao = param.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.paramService.delete(param._id).subscribe(
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
