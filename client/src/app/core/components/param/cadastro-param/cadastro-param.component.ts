import { ParamService } from './../../../service/param.service';
import { Param } from './../../../domain/param';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-param',
  templateUrl: 'cadastro-param.component.html',
  styleUrls: ['./cadastro-param.component.css'],
  providers: [ParamService]
})
export class CadastroParamComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  param: Param = new Param;
  @ViewChild('form') form: any;
  disabled: Boolean = false;
  isAdmin: Boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private paramService: ParamService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterParam(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
      if (currentUser.roles.indexOf('admin') > -1) {
        this.isAdmin = true;
      }
    } catch (e) {
      this.isAdmin = false;
    }
  }

  obterParam(id: string) {
    this.blockUI.start('Carregando...');
    this.paramService.get(id).subscribe(
      response => {
        this.param = response;
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
    this.paramService.createOrUpdate(this.param).subscribe(
      param => {
        this.blockUI.stop();
        if (!this.param._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['administracao/param']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/param']);
  }

}
