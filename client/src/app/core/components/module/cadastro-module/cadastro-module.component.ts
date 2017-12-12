import { ModuleService } from './../../../service/module.service';
import { Module } from './../../../domain/module';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-module',
  templateUrl: 'cadastro-module.component.html',
  styleUrls: ['./cadastro-module.component.css'],
  providers: [ModuleService]
})
export class CadastroModuleComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  module: Module = new Module;
  @ViewChild('form') form;
  disabled: Boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterModule(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterModule(id) {
    this.blockUI.start('Carregando...');
    this.moduleService.get(id).subscribe(
      response => {
        this.module = response;
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
    this.moduleService.createOrUpdate(this.module).subscribe(
      module => {
        this.blockUI.stop();
        if (!this.module._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['module']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['module']);
  }

}
