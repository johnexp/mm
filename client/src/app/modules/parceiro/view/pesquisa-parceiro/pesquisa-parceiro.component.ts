import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { ParceiroService } from './../../service/parceiro.service';
import { Parceiro } from './../../domain/parceiro';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-parceiro',
  templateUrl: 'pesquisa-parceiro.component.html',
  styleUrls: ['./pesquisa-parceiro.component.css'],
  providers: [ParceiroService]
})
export class PesquisaParceiroComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'nome',
    header: 'Nome',
    cell: (row: Parceiro) => `${row.nome}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'tipo',
    header: 'Tipo da Entidade',
    cell: (row: Parceiro) => `${row.tipo}`,
    filter: true,
    type: 'select'
  }, {
    columnDef: 'url',
    header: 'URL',
    cell: (row: Parceiro) => `${row.url}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'ordem',
    header: 'Ordem',
    cell: (row: Parceiro) => `${row.ordem}`,
    filter: false,
    type: 'number'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: Parceiro) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];

  database = new GenericDatabase;
  filtrarAtivos: Boolean;

  tipoLista: string[] = [];

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private parceiroService: ParceiroService) {
  }

  ngOnInit() {

    this.obterValoresEnum('tipo').then((values) => {
      this.tipoLista = values;
    });
  }

  obterValoresEnum(campo) {
    return this.parceiroService.getEnum(campo).toPromise();
  }

  mudarAtivacaoParceiro(parceiro, paginator) {
    const acao = parceiro.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.parceiroService.delete(parceiro._id).subscribe(
      response => {
        parceiro.ativo = !parceiro.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
