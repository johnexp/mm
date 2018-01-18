import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { ProdutoServicoService } from './../../service/produto-servico.service';
import { ProdutoServico } from './../../domain/produto-servico';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-produto-servico',
  templateUrl: 'pesquisa-produto-servico.component.html',
  styleUrls: ['./pesquisa-produto-servico.component.css'],
  providers: [ProdutoServicoService]
})
export class PesquisaProdutoServicoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'titulo',
    header: 'Título',
    cell: (row: ProdutoServico) => `${row.titulo}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'data',
    header: 'Data',
    cell: (row: ProdutoServico) => `${this.datePipe.transform(row.data, 'dd/MM/yyyy')}`,
    filter: true,
    type: 'date'
  }, {
    columnDef: 'descricao',
    header: 'Descrição',
    cell: (row: ProdutoServico) => `${row.descricao}`,
    filter: true,
    type: 'textarea'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: ProdutoServico) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];
  database = new GenericDatabase;
  filtrarAtivos: Boolean;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private produtoServicoService: ProdutoServicoService) {
  }

  ngOnInit() {
    this.buscarProdutoServico();
  }

  buscarProdutoServico() {
    this.blockUI.start('Buscando registros...');
    this.produtoServicoService.getAll(this.filtrarAtivos).subscribe(
      produtoServico => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = produtoServico;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  mudarAtivacaoProdutoServico(produtoServico, paginator) {
    const acao = produtoServico.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.produtoServicoService.delete(produtoServico._id).subscribe(
      response => {
        produtoServico.ativo = !produtoServico.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
