import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { BannerService } from './../../service/banner.service';
import { Banner } from './../../domain/banner';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-banner',
  templateUrl: 'pesquisa-banner.component.html',
  styleUrls: ['./pesquisa-banner.component.css'],
  providers: [BannerService]
})
export class PesquisaBannerComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'tituloL1',
    header: 'Título (1ª Linha)',
    cell: (row: Banner) => `${row.tituloL1}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'tituloL2',
    header: 'Título (2ª Linha)',
    cell: (row: Banner) => `${row.tituloL2 || ''}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'texto',
    header: 'Texto',
    cell: (row: Banner) => `${row.texto || ''}`,
    filter: true,
    type: 'text'
  }];
  database = new GenericDatabase;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private bannerService: BannerService) {
  }

  ngOnInit() {
    this.buscarBanneres();

  }

  buscarBanneres() {
    this.blockUI.start('Buscando registros...');
    this.bannerService.getAll().subscribe(
      banneres => {
        this.blockUI.stop();
        this.database = new GenericDatabase;
        this.database.data = banneres;
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  excluirBanner(banner, paginator) {
    this.blockUI.start('Removendo registro...');
    this.bannerService.delete(banner._id).subscribe(
      response => {
        this.buscarBanneres();
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

  mudarAtivacaoBanner(banner, paginator) {
    const acao = banner.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.bannerService.changeState(banner._id).subscribe(
      response => {
        banner.ativo = !banner.ativo;
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
