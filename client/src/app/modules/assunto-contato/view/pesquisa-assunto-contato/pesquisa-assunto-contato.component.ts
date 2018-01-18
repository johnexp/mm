import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { AssuntoContatoService } from './../../service/assunto-contato.service';
import { AssuntoContato } from './../../domain/assunto-contato';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-assunto-contato',
  templateUrl: 'pesquisa-assunto-contato.component.html',
  styleUrls: ['./pesquisa-assunto-contato.component.css'],
  providers: [AssuntoContatoService]
})
export class PesquisaAssuntoContatoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'assunto',
    header: 'Assunto',
    cell: (row: AssuntoContato) => `${row.assunto || ''}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'email',
    header: 'Enviar Para',
    cell: (row: AssuntoContato) => `${row.email || ''}`,
    filter: true,
    type: 'text'
  }, ];

  database = new GenericDatabase;


  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private assuntoContatoService: AssuntoContatoService) {
  }

  ngOnInit() {
    this.buscarAssuntoContato();

  }

  buscarAssuntoContato() {
    this.blockUI.start('Buscando registros...');
    this.assuntoContatoService.getAll().subscribe(
      assuntoContato => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = assuntoContato;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  excluirAssuntoContato(assuntoContato, paginator) {
    this.blockUI.start('Removendo registro...');
    this.assuntoContatoService.delete(assuntoContato._id).subscribe(
      response => {
        this.buscarAssuntoContato();
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
