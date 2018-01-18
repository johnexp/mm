import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { UserService } from './../../service/user.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: any = {};
  @ViewChild('form') form: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router,
    private userService: UserService,
    private snackBar: CustomSnackBarService) { }

  register() {
    if (!this.form.valid) {
      this.snackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Aguarde...');
    this.userService.create(this.model).subscribe(
      data => {
        this.snackBar.open('Usuário registrado com sucesso!', 'success');
        this.router.navigate(['/login']);
        this.blockUI.stop();
      },
      error => {
        this.snackBar.open(error, 'error');
        this.blockUI.stop();
      }
    );
  }
}
