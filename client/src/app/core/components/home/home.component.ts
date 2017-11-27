import { UserService } from './../../service/user.service';
import { User } from './../../domain/user';
import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  @BlockUI() blockUI: NgBlockUI;

  constructor(private userService: UserService,
    private snackBar: CustomSnackBarService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(_id: string) {
    this.blockUI.start('Aguarde...');
    this.userService.delete(_id).subscribe(
      response => {
        this.blockUI.stop();
        this.loadAllUsers();
      },
      error => {
        this.blockUI.stop();
        this.snackBar.open('Não foi possível remover o usuário', 'error');
      }
    );
  }

  private loadAllUsers() {
    this.blockUI.start('Aguarde...');
    this.userService.getAll().subscribe(
      response => {
        this.blockUI.stop();
        this.users = response;
      },
      error => {
        this.blockUI.stop();
        this.snackBar.open('Não foi possível carregar os usuários', 'error');
      }
    );
  }
}
