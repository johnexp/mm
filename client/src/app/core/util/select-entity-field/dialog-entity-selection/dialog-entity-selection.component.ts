import { GenericDatabase } from './../../data-table/generic-database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-entity-selection-component',
  templateUrl: 'dialog-entity-selection.component.html',
})
export class DialogEntitySelectionComponent implements OnInit {

  database = new GenericDatabase;
  selectedIds: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogEntitySelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.selectedIds = this.data.selectionData.map((data: any) => data._id);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
