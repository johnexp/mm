import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Depoimento } from './../../domain/depoimento';
import { DepoimentoService } from './../../service/depoimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-depoimento',
  templateUrl: 'cadastro-depoimento.component.html',
  styleUrls: ['./cadastro-depoimento.component.css'],
  providers: [DepoimentoService]
})
export class CadastroDepoimentoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  depoimento: Depoimento = new Depoimento;
  @ViewChild('form') form;
  disabled: Boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private depoimentoService: DepoimentoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterDepoimento(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterDepoimento(id) {
    this.blockUI.start('Carregando...');
    this.depoimentoService.get(id).subscribe(
      response => {
        this.depoimento = response;
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
    this.depoimentoService.createOrUpdate(this.depoimento).subscribe(
      depoimento => {
        this.blockUI.stop();
        if (!this.depoimento._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/depoimento']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/depoimento']);
  }

}
