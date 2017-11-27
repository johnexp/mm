import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { UserService } from './../../service/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  model: any = {};
  loading = false;

  constructor(private router: Router,
    private userService: UserService,
    private snackBar: CustomSnackBarService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model).subscribe(
      data => {
        this.snackBar.open('Registration successful', 'success');
        this.router.navigate(['/login']);
      },
      error => {
        this.snackBar.open(error, 'error');
        this.loading = false;
      }
    );
  }
}
