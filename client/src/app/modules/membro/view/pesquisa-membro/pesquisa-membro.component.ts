import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { MembroService } from './../../service/membro.service';
import { Membro } from './../../domain/membro';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-membro',
  templateUrl: 'pesquisa-membro.component.html',
  styleUrls: ['./pesquisa-membro.component.css'],
  providers: [MembroService]
})
export class PesquisaMembroComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { columnDef: 'nome', header: 'Nome', cell: (row: Membro) => `${row.nome}` },
    { columnDef: 'cargo', header: 'Cargo', cell: (row: Membro) => `${row.cargo}` },
  ];
  database = new GenericDatabase;
  pagination: Pagination;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private membroService: MembroService) {
  }

  ngOnInit() {
    this.buscarMembros();
  }

  buscarMembros() {
    this.blockUI.start('Buscando registros...')
    this.membroService.getAll({}).$observable.subscribe(
      membros => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = membros;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível buscar os registros!', 'danger');
      }
    );
  }

  excluirMembro(id, paginator) {
    this.blockUI.start('Removendo registro...');
    this.membroService.delete({ id: id }).$observable.subscribe(
      response => {
        if (!response) {
          this.customSnackBar.open('Não foi possível remover o registro!', 'danger');
        } else {
          this.buscarMembros();
          paginator.pageIndex = 0;
          paginator.page.emit();
        }
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível remover o registro!', 'danger');
      }
    );
  }

}
