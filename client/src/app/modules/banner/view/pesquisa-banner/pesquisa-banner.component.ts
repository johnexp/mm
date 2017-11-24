import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { BannerService } from './../../service/banner.service';
import { Banner } from './../../domain/banner';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-banner',
  templateUrl: 'pesquisa-banner.component.html',
  styleUrls: ['./pesquisa-banner.component.css'],
  providers: [BannerService]
})
export class PesquisaBannerComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { columnDef: 'titulo', header: 'Título', cell: (row: Banner) => `${row.titulo}` },
    { columnDef: 'texto', header: 'Texto', cell: (row: Banner) => `${row.texto}` }
  ];
  database = new GenericDatabase;
  pagination: Pagination;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private bannerService: BannerService) {
  }

  ngOnInit() {
    this.buscarBanneres();
  }

  buscarBanneres() {
    this.blockUI.start('Buscando registros...')
    this.bannerService.getAll({}).$observable.subscribe(
      banneres => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = banneres;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível buscar os registros!', 'danger');
      }
    );
  }

  excluirBanner(id, paginator) {
    this.blockUI.start('Removendo registro...');
    this.bannerService.delete({ id: id }).$observable.subscribe(
      response => {
        if (!response) {
          this.customSnackBar.open('Não foi possível remover o registro!', 'danger');
        } else {
          this.buscarBanneres();
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
