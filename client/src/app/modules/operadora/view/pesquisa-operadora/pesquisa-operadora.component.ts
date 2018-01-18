import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { OperadoraService } from './../../service/operadora.service';
import { Operadora } from './../../domain/operadora';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-operadora',
  templateUrl: 'pesquisa-operadora.component.html',
  styleUrls: ['./pesquisa-operadora.component.css'],
  providers: [OperadoraService]
})
export class PesquisaOperadoraComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'titulo',
    header: 'Título',
    cell: (row: Operadora) => `${row.titulo}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'cnpj',
    header: 'CNPJ',
    cell: (row: Operadora) => `${row.cnpj}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'numeroAns',
    header: 'N° ANS',
    cell: (row: Operadora) => `${row.numeroAns || ''}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: Operadora) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];

  database = new GenericDatabase;
  filtrarAtivos: Boolean;


  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private operadoraService: OperadoraService) {
  }

  ngOnInit() {

  }


  mudarAtivacaoOperadora(operadora, paginator) {
    const acao = operadora.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.operadoraService.delete(operadora._id).subscribe(
      response => {
        operadora.ativo = !operadora.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
