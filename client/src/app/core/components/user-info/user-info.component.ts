import { Permission } from './../../domain/permission';
import { User } from './../../domain/user';
import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserService } from './../../service/user.service';
import { OnInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('form') form;
  user: User = new User;
  permissionsSelectionColumns = [{
    columnDef: 'prettified',
    header: 'Permissão',
    cell: (row: Permission) => `${row.prettified}`,
    filter: true,
    type: 'text'
  }];

  constructor(private customSnackBar: CustomSnackBarService,
    private userService: UserService) {}

  ngOnInit() {
    this.blockUI.start('Aguarde...');
    this.userService.getCurrent().subscribe(
      response => {
        this.blockUI.stop();
        this.user = response;
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
    this.userService.update(this.user).subscribe(
      permission => {
        this.blockUI.stop();
        if (!this.user._id) {
          this.customSnackBar.open('Usuário salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Usuário alterado com sucesso!', 'success');
        }
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }
}
