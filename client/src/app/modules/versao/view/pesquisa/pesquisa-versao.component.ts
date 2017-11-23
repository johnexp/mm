import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { VersaoService } from './../../service/versao.service';
import { Versao } from './../../domain/versao';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-versao',
  templateUrl: './pesquisa-versao.component.html',
  providers: [VersaoService]
})
export class PesquisaVersaoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { value: 'ticket', viewValue: 'Ticket' },
    { value: 'numeroVersao', viewValue: 'Versão' },
    { value: 'descricao', viewValue: 'Descrição' },
    { value: 'data', viewValue: 'Data', pipe: 'date', type: 'date' }
  ];
  database = new GenericDatabase;
  pagination: Pagination;


  constructor(private location: Location,
    private versaoService: VersaoService,
    private customSnackBar: CustomSnackBarService) {
  }

  ngOnInit() {
    this.buscarVersoes();
  }

  buscarVersoes() {
    this.versaoService.getAll({}).$observable.subscribe(
      response => {
        this.database.data = response.docs;
      },
      error => {
        this.customSnackBar.open('Não foi possível buscar os registros!');
      }
    );
  }

  excluirVersao(event) {
    this.blockUI.start('Removendo registro...');
    this.versaoService.delete({ id: event[0] }).$observable.subscribe(
      response => {
        if (!response) {
          this.customSnackBar.open('Não foi possível remover o registro!');
        } else {
          event[1].pageIndex = 0;
          event[1].page.emit();
        }
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível remover o registro!');
      }
    );
  }

  voltar() {
    this.location.back();
  }

}
