import { Component, ViewEncapsulation, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'custom-snack-bar',
  styleUrls: ['custom-snack-bar.component.scss'],
  templateUrl: 'custom-snack-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class CustomSnackBarComponent {

  constructor(public snackBar: MatSnackBar) {
  }

}