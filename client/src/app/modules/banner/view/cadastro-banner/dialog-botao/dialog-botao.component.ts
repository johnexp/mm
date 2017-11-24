import { Botao } from './../../../domain/botao';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-botao-component',
  templateUrl: 'dialog-botao.component.html',
})
export class DialogBotaoComponent {

  cores: any[] = Botao.CORES_ARR;

  constructor(
    public dialogRef: MatDialogRef<DialogBotaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}