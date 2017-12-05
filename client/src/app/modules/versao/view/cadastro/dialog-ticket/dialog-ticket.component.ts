import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
declare const $;

@Component({
  selector: 'app-dialog-ticket-component',
  templateUrl: 'dialog-ticket.component.html',
})
export class DialogTicketComponent {

  public froalaOptions: Object = {
    imageUpload: false,
    imagePaste: false,
    toolbarButtons: ['bold', 'italic', 'underline'],
    placeholderText: 'Conteúdo',
    language: 'pt_br',
    quickInsertButtons: [],
    enter: $.FroalaEditor.ENTER_BR
  };

  constructor(
    public dialogRef: MatDialogRef<DialogTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
