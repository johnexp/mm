import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-submenu-component',
  templateUrl: 'dialog-submenu.component.html',
})
export class DialogSubmenuComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSubmenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
