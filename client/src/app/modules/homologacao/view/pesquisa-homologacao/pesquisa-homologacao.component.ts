import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { HomologacaoService } from './../../service/homologacao.service';
import { Homologacao } from './../../domain/homologacao';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-homologacao',
  templateUrl: 'pesquisa-homologacao.component.html',
  styleUrls: ['./pesquisa-homologacao.component.css'],
  providers: [HomologacaoService]
})
export class PesquisaHomologacaoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { columnDef: 'descricao', header: 'Descrição', cell: (row: Homologacao) => `${row.descricao}` },
    { columnDef: 'responsavel', header: 'Responsável', cell: (row: Homologacao) => `${row.responsavel}` },
    { columnDef: 'empresa', header: 'Empresa', cell: (row: Homologacao) => `${row.empresa}` }
  ];
  database = new GenericDatabase;
  pagination: Pagination;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private homologacaoService: HomologacaoService) {
  }

  ngOnInit() {
    this.buscarHomologacaos();
  }

  buscarHomologacaos() {
    this.blockUI.start('Buscando registros...')
    this.homologacaoService.getAll().subscribe(
      homologacaos => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = homologacaos;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível buscar os registros!', 'danger');
      }
    );
  }

  excluirHomologacao(id, paginator) {
    this.blockUI.start('Removendo registro...');
    this.homologacaoService.delete(id).subscribe(
      response => {
        this.buscarHomologacaos();
        paginator.pageIndex = 0;
        paginator.page.emit();
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível remover o registro!', 'danger');
      }
    );
  }

}
