import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Arquivo } from './../../domain/arquivo';
import { ArquivoService } from './../../service/arquivo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-arquivo',
  templateUrl: 'cadastro-arquivo.component.html',
  styleUrls: ['./cadastro-arquivo.component.css'],
  providers: [ArquivoService]
})
export class CadastroArquivoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  arquivo: Arquivo = new Arquivo;
  @ViewChild('form') form;
  file: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private arquivoService: ArquivoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterArquivo(params.params['id']);
      }
    });
  }

  obterArquivo(id) {
    this.blockUI.start('Carregando...');
    this.arquivoService.get(id).subscribe(
      response => {
        this.arquivo = response;
        this.file = this.arquivo.caminhoArquivo;
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
    this.blockUI.start('Salvando...');
    this.arquivoService.createOrUpdate(this.arquivo).subscribe(
      arquivo => {
        this.blockUI.stop();
        if (!this.arquivo._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['arquivo']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['arquivo']);
  }

}
