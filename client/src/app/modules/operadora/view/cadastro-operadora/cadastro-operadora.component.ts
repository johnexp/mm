import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Operadora } from './../../domain/operadora';
import { OperadoraService } from './../../service/operadora.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-operadora',
  templateUrl: 'cadastro-operadora.component.html',
  styleUrls: ['./cadastro-operadora.component.css'],
  providers: [OperadoraService]
})
export class CadastroOperadoraComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  operadora: Operadora = new Operadora;
  @ViewChild('form') form;
  disabled: Boolean = false;
  public cnpjMask = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/',
    /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private operadoraService: OperadoraService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterOperadora(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterOperadora(id) {
    this.blockUI.start('Carregando...');
    this.operadoraService.get(id).subscribe(
      response => {
        this.operadora = response;
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
    this.operadoraService.createOrUpdate(this.operadora).subscribe(
      operadora => {
        this.blockUI.stop();
        if (!this.operadora._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/operadora']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/operadora']);
  }

}
