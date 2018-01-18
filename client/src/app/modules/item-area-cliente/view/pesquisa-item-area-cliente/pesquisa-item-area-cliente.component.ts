import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { ItemAreaClienteService } from './../../service/item-area-cliente.service';
import { ItemAreaCliente } from './../../domain/item-area-cliente';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-item-area-cliente',
  templateUrl: 'pesquisa-item-area-cliente.component.html',
  styleUrls: ['./pesquisa-item-area-cliente.component.css'],
  providers: [ItemAreaClienteService]
})
export class PesquisaItemAreaClienteComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'titulo',
    header: 'Título',
    cell: (row: ItemAreaCliente) => `${row.titulo || ''}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'cor',
    header: 'Cor',
    cell: (row: ItemAreaCliente) => `${ItemAreaCliente.CORES[row.cor] || ''}`,
    filter: true,
    type: 'select'
  }, {
    columnDef: 'home',
    header: 'Exibir na Home',
    cell: (row: ItemAreaCliente) => `${row.home ? 'Sim' : 'Não'}`,
    filter: true,
    type: 'switch'
  }, {
    columnDef: 'ordem',
    header: 'Ordem',
    cell: (row: ItemAreaCliente) => `${row.ordem || ''}`,
    filter: false,
    sorted: true,
    type: 'number'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: ItemAreaCliente) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];

  database = new GenericDatabase;
  filtrarAtivos: Boolean;

  corLista: string[] = [];

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private itemAreaClienteService: ItemAreaClienteService) {
  }

  ngOnInit() {
    this.buscarItemAreaCliente();

    this.obterValoresEnum('cor').then((values) => {
      this.corLista = values;
    });
  }

  obterValoresEnum(campo) {
    return this.itemAreaClienteService.getEnum(campo).toPromise();
  }
  buscarItemAreaCliente() {
    this.blockUI.start('Buscando registros...');
    this.itemAreaClienteService.getAll(this.filtrarAtivos).subscribe(
      itemAreaCliente => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = itemAreaCliente;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  mudarAtivacaoItemAreaCliente(itemAreaCliente, paginator) {
    const acao = itemAreaCliente.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.itemAreaClienteService.delete(itemAreaCliente._id).subscribe(
      response => {
        itemAreaCliente.ativo = !itemAreaCliente.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
