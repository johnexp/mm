import { DialogBotaoComponent } from './dialog-botao/dialog-botao.component';
import { MatDialog } from '@angular/material';
import { Botao } from './../../domain/botao';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Banner } from './../../domain/banner';
import { BannerService } from './../../service/banner.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { File } from './../../../../core/domain/file';

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
  disabled: Boolean = false;
  databaseBotoes = new GenericDatabase;
  displayedBotoesColumns = [
    { columnDef: 'texto', header: 'Texto', cell: (row: Botao) => `${row.texto}` },
    { columnDef: 'url', header: 'URL', cell: (row: Botao) => `${row.url}` },
    { columnDef: 'cor', header: 'Cor', cell: (row: Botao) => `${Botao.CORES[row.cor]}` }
  ];

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
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterBanner(id) {
    this.blockUI.start('Carregando...');
    this.bannerService.get(id).subscribe(
      response => {
        this.banner = response;
        this.banner.botoes = this.banner.botoes || [];
        this.databaseBotoes = new GenericDatabase;
        this.databaseBotoes.data = this.banner.botoes;
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open(error, 'danger');
        this.blockUI.stop();
      }
    );
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    const formData = new FormData();
    if (this.banner.imagem && this.banner.imagem.file) {
      formData.append('image', this.banner.imagem.file.binary);
    }
    formData.append('banner', JSON.stringify(this.banner));
    if (this.banner._id) {
      formData.append('_id', this.banner._id.toString());
    }
    this.blockUI.start('Salvando...');
    this.bannerService.createOrUpdate(formData,
      banner => {
        this.blockUI.stop();
        if (!banner) {
          this.customSnackBar.open('Não foi possível salvar o registro.', 'danger');
        } else {
          if (!this.banner._id) {
            this.customSnackBar.open('Registro salvo com sucesso!', 'success');
          } else {
            this.customSnackBar.open('Registro alterado com sucesso!', 'success');
          }
          this.router.navigate(['cadastros/banner']);
        }
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/banner']);
  }

  abrirDialogBotao(botao?: Botao): void {
    if (!botao) {
      botao = new Botao;
    } else {
      // clona o botão para não editar o objeto no grid
      botao = JSON.parse(JSON.stringify(botao));
    }
    const dialogRef = this.dialog.open(DialogBotaoComponent, {
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
      const indexBotaoAlterado = this.banner.botoes.findIndex(botaoExistente => botao._id === botaoExistente._id);
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
