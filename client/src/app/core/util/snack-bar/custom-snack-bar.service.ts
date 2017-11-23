import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Direction } from '@angular/cdk/bidi';
import { Injectable, AfterViewInit } from '@angular/core';

@Injectable()
export class CustomSnackBarService implements AfterViewInit {

  actionButtonLabel: string = ' ';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 3000;
  addExtraClass: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  direction: Direction = 'ltr';

  constructor(private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.snackBar.dismiss();
  }

  open(message: string, severity?: string, action?: string, customConfig?: any) {
    const config = new MatSnackBarConfig();
    customConfig = customConfig || {};
    config.verticalPosition = customConfig.verticalPosition || this.verticalPosition;
    config.horizontalPosition = customConfig.horizontalPosition || this.horizontalPosition;
    config.duration = customConfig.autoHide || this.setAutoHide ? this.autoHide : 0;
    config.panelClass = customConfig.panelClass || ('custom-snack-bar' + (severity ? '-' + severity : ''));
    config.direction = this.direction;
    this.snackBar.open(message, action || this.actionButtonLabel, config);
  }

}