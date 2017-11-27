import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { ItemProgressoService } from './../../service/item-progresso.service';
import { ItemProgresso } from './../../domain/item-progresso';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-item-progresso',
  templateUrl: 'pesquisa-item-progresso.component.html',
  styleUrls: ['./pesquisa-item-progresso.component.css'],
  providers: [ItemProgressoService]
})
export class PesquisaItemProgressoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { columnDef: 'titulo', header: 'Título', cell: (row: ItemProgresso) => `${row.titulo}` },
    { columnDef: 'subtitulo', header: 'Subtítulo', cell: (row: ItemProgresso) => `${row.subtitulo}` },
    { columnDef: 'progresso', header: 'Progresso', cell: (row: ItemProgresso) => `${row.progresso}` }
  ];
  database = new GenericDatabase;
  pagination: Pagination;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private itemProgressoService: ItemProgressoService) {
  }

  ngOnInit() {
    this.buscarItemProgresso();
  }

  buscarItemProgresso() {
    this.blockUI.start('Buscando registros...')
    this.itemProgressoService.getAll().subscribe(
      itemProgresso => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = itemProgresso;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível buscar os registros!', 'danger');
      }
    );
  }

  excluirItemProgresso(id, paginator) {
    this.blockUI.start('Removendo registro...');
    this.itemProgressoService.delete(id).subscribe(
      response => {
        this.buscarItemProgresso();
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
