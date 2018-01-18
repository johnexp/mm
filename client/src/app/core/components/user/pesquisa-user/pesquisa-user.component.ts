import { Role } from './../../../domain/role';
import { UserService } from './../../../service/user.service';
import { Action } from '../../../domain/action';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { User } from '../../../domain/user';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Module } from '../../../domain/module';

@Component({
  selector: 'app-pesquisa-user',
  templateUrl: 'pesquisa-user.component.html',
  styleUrls: ['./pesquisa-user.component.css'],
  providers: [UserService]
})
export class PesquisaUserComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'username',
    header: 'Usuário',
    cell: (row: User) => `${row.username}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'firstName',
    header: 'Nome',
    cell: (row: User) => `${row.firstName}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'lastName',
    header: 'Sobrenome',
    cell: (row: User) => `${row.lastName}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'email',
    header: 'Email',
    cell: (row: User) => `${row.email}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'roles',
    header: 'Perfis',
    cell: (row: User) => `${row.roles ? row.roles.map(role => role.roleName).join(', ') : ''}`,
    filter: true,
    type: 'entity'
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: User) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];
  rolesSelectionColumns = [{
    columnDef: 'roleName',
    header: 'Perfil',
    cell: (row: Role) => `${row.roleName}`,
    filter: true,
    type: 'text'
  }];

  database = new GenericDatabase;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private userService: UserService) {
  }

  ngOnInit() { }

  mudarAtivacaoUser(user: User, paginator: any) {
    const acao = user.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.userService.delete(user._id).subscribe(
      response => {
        paginator.pageIndex = 0;
        paginator.page.emit();
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
