import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { ArquivoService } from './../../service/arquivo.service';
import { Arquivo } from './../../domain/arquivo';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-arquivo',
  templateUrl: 'pesquisa-arquivo.component.html',
  styleUrls: ['./pesquisa-arquivo.component.css'],
  providers: [ArquivoService]
})
export class PesquisaArquivoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { columnDef: 'nome', header: 'Nome', cell: (row: Arquivo) => `${row.nome}` }
  ];
  database = new GenericDatabase;
  pagination: Pagination;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private arquivoService: ArquivoService) {
  }

  ngOnInit() {
    this.buscarArquivos();
  }

  buscarArquivos() {
    this.blockUI.start('Buscando registros...')
    this.arquivoService.getAll().subscribe(
      arquivos => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = arquivos;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  excluirArquivo(id, paginator) {
    this.blockUI.start('Removendo registro...');
    this.arquivoService.delete(id).subscribe(
      response => {
        this.buscarArquivos();
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
