import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { ApresentacaoPlanos } from './../../domain/apresentacao-planos';
import { ApresentacaoPlanosService } from './../../service/apresentacao-planos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-apresentacao-planos',
  templateUrl: 'cadastro-apresentacao-planos.component.html',
  styleUrls: ['./cadastro-apresentacao-planos.component.css'],
  providers: [ApresentacaoPlanosService]
})
export class CadastroApresentacaoPlanosComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  apresentacaoPlanos: ApresentacaoPlanos = new ApresentacaoPlanos;
  @ViewChild('form') form;

  constructor(private router: Router,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private apresentacaoPlanosService: ApresentacaoPlanosService) {
  }

  ngOnInit() {
    this.obterApresentacaoPlanos();
  }

  obterApresentacaoPlanos() {
    this.blockUI.start('Carregando...');
    this.apresentacaoPlanosService.get().subscribe(
      response => {
        if (response) {
          this.apresentacaoPlanos = response;
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
    this.apresentacaoPlanosService.createOrUpdate(this.apresentacaoPlanos).subscribe(
      apresentacaoPlanos => {
        this.blockUI.stop();
        if (!this.apresentacaoPlanos._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/apresentacao-planos']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

}
