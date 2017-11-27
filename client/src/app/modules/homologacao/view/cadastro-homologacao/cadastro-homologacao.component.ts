import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Homologacao } from './../../domain/homologacao';
import { HomologacaoService } from './../../service/homologacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-homologacao',
  templateUrl: 'cadastro-homologacao.component.html',
  styleUrls: ['./cadastro-homologacao.component.css'],
  providers: [HomologacaoService]
})
export class CadastroHomologacaoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  homologacao: Homologacao = new Homologacao;
  @ViewChild('form') form;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private homologacaoService: HomologacaoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterHomologacao(params.params['id']);
      }
    });
  }

  obterHomologacao(id) {
    this.blockUI.start('Carregando...');
    this.homologacaoService.get(id).subscribe(
      response => {
        this.homologacao = response;
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
    this.homologacaoService.createOrUpdate(this.homologacao).subscribe(
      homologacao => {
        this.blockUI.stop();
        if (!this.homologacao._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['homologacao']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['homologacao']);
  }

}
