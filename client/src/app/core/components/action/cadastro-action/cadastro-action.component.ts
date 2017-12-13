import { ActionService } from './../../../service/action.service';
import { Action } from './../../../domain/action';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-action',
  templateUrl: 'cadastro-action.component.html',
  styleUrls: ['./cadastro-action.component.css'],
  providers: [ActionService]
})
export class CadastroActionComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  action: Action = new Action;
  @ViewChild('form') form;
  disabled: Boolean = false;
  actionsSelectionColumns = [{
    columnDef: 'actionName',
    header: 'Nome da Ação',
    cell: (row: Action) => `${row.actionName}`,
    filter: true,
    type: 'text'
  }];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private actionService: ActionService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterAction(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterAction(id) {
    this.blockUI.start('Carregando...');
    this.actionService.get(id).subscribe(
      response => {
        this.action = response;
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
    this.actionService.createOrUpdate(this.action).subscribe(
      action => {
        this.blockUI.stop();
        if (!this.action._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['action']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/action']);
  }

}
