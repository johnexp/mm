import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { Botao } from './../../domain/botao';
import { DialogBotaoComponent } from './dialog-botao/dialog-botao.component';
import { MatDialog } from '@angular/material';
import { AppSettings } from './../../../../app.settings';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Banner } from './../../domain/banner';
import { BannerService } from './../../service/banner.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-banner',
  templateUrl: 'cadastro-banner.component.html',
  styleUrls: ['./cadastro-banner.component.css'],
  providers: [BannerService]
})
export class CadastroBannerComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  banner: Banner = new Banner;
  @ViewChild('form') form;
  databaseBotoes = new GenericDatabase;
  displayedBotoesColumns = [
    { columnDef: 'texto', header: 'Texto', cell: (row: Botao) => `${row.texto}` },
    { columnDef: 'url', header: 'URL', cell: (row: Botao) => `${row.url}` },
    { columnDef: 'cor', header: 'Cor', cell: (row: Botao) => `${Botao.CORES[row.cor]}` }
  ];
  imagem: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private bannerService: BannerService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterBanner(params.params['id']);
      }
    });
  }

  obterBanner(id) {
    this.blockUI.start('Carregando...');
    this.bannerService.get({ id: id }).$observable.subscribe(
      response => {
        this.banner = response;
        this.banner.botoes = this.banner.botoes || [];
        this.databaseBotoes = new GenericDatabase;
        this.databaseBotoes.data = this.banner.botoes;
        this.imagem = this.banner.arquivo;
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open('Não foi possível obter o registro', 'danger');
        this.blockUI.stop();
      }
    );
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Salvando...');
    this.bannerService.createOrUpdate(this.banner).$observable.subscribe(
      banner => {
        this.blockUI.stop();
        if (!this.banner._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['banner']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['banner']);
  }

  abrirDialogBotao(botao?: Botao): void {
    if (!botao) {
      botao = new Botao;
    } else {
      // clona o botão para não editar o objeto no grid
      botao = JSON.parse(JSON.stringify(botao));
    }
    let dialogRef = this.dialog.open(DialogBotaoComponent, {
      width: '400px',
      data: { botao: botao }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adicionarBotao(result);
      }
    });
  }

  adicionarBotao(botao: Botao) {
    if (botao._id == null) {
      botao._id = '___' + Math.random().toString(36).substring(7);
      this.banner.botoes.push(botao);
    } else {
      let indexBotaoAlterado = this.banner.botoes.findIndex(botaoExistente => botao._id == botaoExistente._id);
      this.banner.botoes.splice(indexBotaoAlterado, 1);
      this.databaseBotoes = new GenericDatabase;
      this.databaseBotoes.data = this.banner.botoes;
      this.changeDetectorRef.detectChanges();
      this.banner.botoes.splice(indexBotaoAlterado, 0, botao);
    }
    this.databaseBotoes = new GenericDatabase;
    this.databaseBotoes.data = this.banner.botoes;
  }

  removerBotao(idBotao) {
    const index = this.banner.botoes.findIndex(botao => botao._id === idBotao);
    this.banner.botoes.splice(index, 1);
    this.databaseBotoes = new GenericDatabase;
    this.databaseBotoes.data = this.banner.botoes;
  }

}
