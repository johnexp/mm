import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { ApresentacaoSite } from './../../domain/apresentacao-site';
import { ApresentacaoSiteService } from './../../service/apresentacao-site.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-apresentacao-site',
  templateUrl: 'cadastro-apresentacao-site.component.html',
  styleUrls: ['./cadastro-apresentacao-site.component.css'],
  providers: [ApresentacaoSiteService]
})
export class CadastroApresentacaoSiteComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  apresentacaoSite: ApresentacaoSite = new ApresentacaoSite;
  @ViewChild('form') form;

  constructor(private router: Router,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private apresentacaoSiteService: ApresentacaoSiteService) {
  }

  ngOnInit() {
    this.obterApresentacaoSite();
  }

  obterApresentacaoSite() {
    this.blockUI.start('Carregando...');
    this.apresentacaoSiteService.get().subscribe(
      response => {
        if (response) {
          this.apresentacaoSite = response;
        }
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
    this.apresentacaoSiteService.createOrUpdate(this.apresentacaoSite).subscribe(
      apresentacaoSite => {
        this.blockUI.stop();
        if (!this.apresentacaoSite._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['apresentacao-site']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

}
