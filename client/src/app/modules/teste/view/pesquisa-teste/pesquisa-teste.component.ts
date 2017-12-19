import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { TesteService } from './../../service/teste.service';
import { Teste } from './../../domain/teste';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Membro } from './../../../membro/domain/membro';

@Component({
  selector: 'app-pesquisa-teste',
  templateUrl: 'pesquisa-teste.component.html',
  styleUrls: ['./pesquisa-teste.component.css'],
  providers: [TesteService]
})
export class PesquisaTesteComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'nome',
    header: 'Nome',
    cell: (row: Teste) => `${row.nome}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'descricao',
    header: 'Descrição',
    cell: (row: Teste) => `${row.descricao}`,
    filter: true,
    type: 'textarea'
  }, {
    columnDef: 'definitivo',
    header: 'Definitivo?',
    cell: (row: Teste) => `${row.definitivo ? 'Sim' : 'Não'}`,
    filter: true,
    type: 'switch'
  }, {
    columnDef: 'dataInicio',
    header: 'Data de Início',
    cell: (row: Teste) => `${this.datePipe.transform(row.dataInicio, 'dd/MM/yyyy')}`,
    filter: true,
    type: 'date'
  }, {
    columnDef: 'quantidade',
    header: 'Quantidade',
    cell: (row: Teste) => `${row.quantidade}`,
    filter: true,
    type: 'number'
  }, {
    columnDef: 'cor',
    header: 'Cor',
    cell: (row: Teste) => `${row.cor}`,
    filter: true,
    type: 'radio'
  }, {
    columnDef: 'cores',
    header: 'Cores',
    cell: (row: Teste) => `${row.cores.join(', ')}`,
    filter: true,
    type: 'checkbox-multiple'
  }, {
    columnDef: 'selectCores',
    header: 'Select Cores',
    cell: (row: Teste) => `${row.selectCores.join(', ')}`,
    filter: true,
    type: 'select'
  },  {
    columnDef: 'membro',
    header: 'Membro',
    cell: (row: Teste) => `${row.membro ? row.membro.nome : ''}`,
    filter: true,
    type: 'entity'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: Teste) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];

  membroSelectionColumns = [{
    columnDef: 'nome',
    header: 'Nome',
    cell: (row: Membro) => `${row.nome}`,
    filter: true,
    type: 'text'
  }];
  membrosSelectionColumns = [{
    columnDef: 'nome',
    header: 'Nome',
    cell: (row: Membro) => `${row.nome}`,
    filter: true,
    type: 'text'
  }];
  database = new GenericDatabase;
  filtrarAtivos: Boolean;

  corLista: string[] = [];
  coresLista: string[] = [];
  selectCoresLista: string[] = [];

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private testeService: TesteService) {
  }

  ngOnInit() {

    this.obterValoresEnum('cor').then((values) => {
      this.corLista = values;
    });
    this.obterValoresEnum('cores').then((values) => {
      this.coresLista = values;
    });
    this.obterValoresEnum('selectCores').then((values) => {
      this.selectCoresLista = values;
    });
  }

  obterValoresEnum(campo) {
    return this.testeService.getEnum(campo).toPromise();
  }

  mudarAtivacaoTeste(teste, paginator) {
    const acao = teste.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.testeService.delete(teste._id).subscribe(
      response => {
        teste.ativo = !teste.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
