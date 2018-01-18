import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { DepoimentoService } from './../../service/depoimento.service';
import { Depoimento } from './../../domain/depoimento';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-depoimento',
  templateUrl: 'pesquisa-depoimento.component.html',
  styleUrls: ['./pesquisa-depoimento.component.css'],
  providers: [DepoimentoService]
})
export class PesquisaDepoimentoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'empresa',
    header: 'Empresa',
    cell: (row: Depoimento) => `${row.empresa}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'depoimento',
    header: 'Depoimento',
    cell: (row: Depoimento) => `${row.depoimento}`,
    filter: true,
    type: 'textarea'
  }, ];

  database = new GenericDatabase;


  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private depoimentoService: DepoimentoService) {
  }

  ngOnInit() {
    this.buscarDepoimentos();

  }

  buscarDepoimentos() {
    this.blockUI.start('Buscando registros...');
    this.depoimentoService.getAll().subscribe(
      depoimentos => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = depoimentos;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  excluirDepoimento(depoimento, paginator) {
    this.blockUI.start('Removendo registro...');
    this.depoimentoService.delete(depoimento._id).subscribe(
      response => {
        this.buscarDepoimentos();
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
