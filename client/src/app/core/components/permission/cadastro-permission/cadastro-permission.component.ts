import { PermissionService } from './../../../service/permission.service';
import { Module } from './../../../domain/module';
import { Permission } from './../../../domain/permission';
import { Action } from './../../../../core/domain/action';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-permission',
  templateUrl: 'cadastro-permission.component.html',
  styleUrls: ['./cadastro-permission.component.css'],
  providers: [PermissionService]
})
export class CadastroPermissionComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  permission: Permission = new Permission;
  @ViewChild('form') form;
  disabled: Boolean = false;
  isEditing: Boolean = false;
  actionSelectionColumns = [{
    columnDef: 'actionName',
    header: 'Nome da Ação',
    cell: (row: Action) => `${row.actionName}`,
    filter: true,
    type: 'text'
  }];
  moduleSelectionColumns = [{
    columnDef: 'moduleName',
    header: 'Nome do Módulo',
    cell: (row: Module) => `${row.moduleName}`,
    filter: true,
    type: 'text'
  }];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.isEditing = true;
        this.obterPermission(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterPermission(id) {
    this.blockUI.start('Carregando...');
    this.permissionService.get(id).subscribe(
      response => {
        this.permission = response;
        this.permission.actions = [];
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
    this.permissionService.createOrUpdate(this.permission).subscribe(
      permission => {
        this.blockUI.stop();
        if (!this.permission._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['administracao/permission']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/permission']);
  }

}
