import { Permission } from './../../../domain/permission';
import { RoleService } from './../../../service/role.service';
import { Role } from './../../../domain/role';
import { CustomSnackBarService } from './../../../util/snack-bar/custom-snack-bar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-role',
  templateUrl: 'cadastro-role.component.html',
  styleUrls: ['./cadastro-role.component.css'],
  providers: [RoleService]
})
export class CadastroRoleComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  role: Role = new Role;
  @ViewChild('form') form: any;
  disabled: Boolean = false;
  permissionSelectionColumns = [{
    columnDef: 'prettified',
    header: 'Permissão',
    cell: (row: Permission) => `${row.prettified}`,
    filter: true,
    type: 'text'
  }];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private roleService: RoleService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterRole(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterRole(id: string) {
    this.blockUI.start('Carregando...');
    this.roleService.get(id).subscribe(
      response => {
        this.role = response;
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
    this.roleService.createOrUpdate(this.role).subscribe(
      role => {
        this.blockUI.stop();
        if (!this.role._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['administracao/role']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/role']);
  }

}
