import { Role } from './../../../domain/role';
import { UserService } from './../../../service/user.service';
import { Module } from './../../../domain/module';
import { User } from './../../../domain/user';
import { Action } from './../../../domain/action';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: 'cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.css'],
  providers: [UserService]
})
export class CadastroUserComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  user: User = new User;
  @ViewChild('form') form: any;
  disabled: Boolean = false;
  rolesSelectionColumns = [{
    columnDef: 'roleName',
    header: 'Perfil',
    cell: (row: Role) => `${row.roleName}`,
    filter: true,
    type: 'text'
  }];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterUser(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterUser(id: string) {
    this.blockUI.start('Carregando...');
    this.userService.get(id).subscribe(
      response => {
        this.user = response;
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
    this.userService.createOrUpdate(this.user).subscribe(
      user => {
        this.blockUI.stop();
        if (!this.user._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['administracao/user']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/user']);
  }

}
