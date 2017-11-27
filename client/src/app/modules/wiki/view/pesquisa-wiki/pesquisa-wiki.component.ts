import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../../../../core/domain/pagination';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { WikiService } from './../../service/wiki.service';
import { Wiki } from './../../domain/wiki';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-wiki',
  templateUrl: 'pesquisa-wiki.component.html',
  styleUrls: ['./pesquisa-wiki.component.css'],
  providers: [WikiService]
})
export class PesquisaWikiComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [
    { columnDef: 'titulo', header: 'Título', cell: (row: Wiki) => `${row.titulo}` },
    { columnDef: 'dataPublicacao', header: 'Data da Publicação', cell: (row: Wiki) => `${this.datePipe.transform(row.dataPublicacao, 'dd/MM/yyyy')}` },
    { columnDef: 'descricao', header: 'Descrição', cell: (row: Wiki) => `${row.descricao}` }
  ];
  database = new GenericDatabase;
  pagination: Pagination;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private wikiService: WikiService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
  }


  excluirWiki(id, paginator) {
    this.blockUI.start('Removendo registro...');
    this.wikiService.delete(id).subscribe(
      response => {
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
