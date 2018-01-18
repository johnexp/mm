import { RoleService } from './../../../service/role.service';
import { Role } from './../../../domain/role';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { GenericDatabase } from './../../../util/data-table/generic-database';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pesquisa-role',
  templateUrl: 'pesquisa-role.component.html',
  styleUrls: ['./pesquisa-role.component.css'],
  providers: [RoleService]
})
export class PesquisaRoleComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = [{
    columnDef: 'roleName',
    header: 'Nome do Perfil',
    cell: (row: Role) => `${row.roleName}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'roleKey',
    header: 'Identificador',
    cell: (row: Role) => `${row.roleKey}`,
    filter: true,
    type: 'text'
  }, {
    columnDef: 'isAdmin',
    header: 'Perfil Administrador',
    cell: (row: Role) => `${row.isAdmin ? 'Sim' : 'Não'}`,
    filter: false
  }, {
    columnDef: 'ativo',
    header: 'Ativo',
    cell: (row: Role) => `${row.ativo ? 'Sim' : 'Não'}`,
    filter: false
  }];
  database = new GenericDatabase;
  filtrarAtivos: Boolean;

  constructor(private location: Location,
    private customSnackBar: CustomSnackBarService,
    private datePipe: DatePipe,
    private roleService: RoleService) {
  }

  ngOnInit() { }

  mudarAtivacaoRole(role: Role, paginator: any) {
    const acao = role.ativo === true ? 'Inativando' : 'Ativando';
    this.blockUI.start(acao + ' registro...');
    this.roleService.delete(role._id).subscribe(
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
