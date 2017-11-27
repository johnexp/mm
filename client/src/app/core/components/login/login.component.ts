import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  @ViewChild('form') form;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBarService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (!this.form.valid) {
      this.snackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Aguarde...');
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      response => {
        this.router.navigate([this.returnUrl]);
        this.blockUI.stop();
      },
      error => {
        this.snackBar.open(error, 'error');
        this.blockUI.stop();
      }
    );
  }
}
