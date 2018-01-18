import { GenericDatabase } from './../data-table/generic-database';
import { FormControl, Validators } from '@angular/forms';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog } from '@angular/material';
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DialogEntitySelectionComponent } from './dialog-entity-selection/dialog-entity-selection.component';

@Component({
  selector: 'app-select-entity-field',
  templateUrl: './select-entity-field.component.html',
  styleUrls: ['./select-entity-field.component.css']
})
export class SelectEntityFieldComponent implements AfterViewInit {

  @Input() entityName: string;
  @Input() fieldLabel: string;
  @Input() filter: any = {};
  @Input() form: any;
  @Input() displayedColumns: any[] = [];
  @Input() modelEntityProperty: string;
  @Input() entityMainProperty: string;
  @Input() multiple: Boolean = false;
  @Input() required: Boolean = false;
  @Input() disabled: Boolean = false;
  @Input() lazyFetch: Boolean = true;
  @Input() selectionType: String = 'input';
  database = new GenericDatabase;
  selectedRecords: String = '';
  selectedIds: string[] = [];
  _modelChange = new BehaviorSubject([]);

  get model(): any {
    return this._modelChange.value;
  }

  @Input('model')
  set model(data: any) {
    if (data && data._id && data[this.modelEntityProperty]) {
      if (this.multiple) {
        this.selectedRecords = data[this.modelEntityProperty].map((record: any) => record[this.entityMainProperty]).join(', ');
      } else {
        this.selectedRecords = data[this.modelEntityProperty][this.entityMainProperty];
      }
    } else {
      this.selectedRecords = '';
    }
    this._modelChange.next(data);
    if (this.selectionType === 'grid') {
      this.setSelectedIds();
    }
    this.validateRequired();
  }

  constructor(private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.validateRequired();
  }

  setSelectedIds() {
    if (this.selectionType === 'grid') {
      this.selectedIds = this.model[this.modelEntityProperty].map((data: any) => data._id);
    }
  }

  validateRequired() {
    if (this.required && this.model[this.modelEntityProperty]) {
      if ((this.multiple && this.model[this.modelEntityProperty].length === 0)
        || (!this.multiple && !this.model[this.modelEntityProperty]._id)) {
        const ctrl = new FormControl(this.modelEntityProperty, {
          validators: Validators.required
        });
        Promise.resolve(null).then(() => {
          this.form.form.registerControl(this.modelEntityProperty, ctrl);
          this.form.form.controls[this.modelEntityProperty].setErrors({ 'required': true });
        });
      } else {
        this.form.form.controls[this.modelEntityProperty].setErrors(null);
      }
    }
    this.setSelectedIds();
    this.changeDetectorRef.detectChanges();
  }

  openEntitySelectionModal() {
    let selectionData = [];
    if (this.model[this.modelEntityProperty]) {
      if (this.multiple) {
        selectionData = this.model[this.modelEntityProperty];
      } else {
        selectionData = [this.model[this.modelEntityProperty]];
      }
    }
    const dialogRef = this.dialog.open(DialogEntitySelectionComponent, {
      width: '800px',
      data: {
        filter: this.filter,
        entityName: this.entityName,
        displayedColumns: this.displayedColumns,
        selectionData: JSON.parse(JSON.stringify(selectionData)),
        multiple: this.multiple,
        lazyFetch: this.lazyFetch
      }
    });
    this.registerDialogCloseCallback(dialogRef);
  }

  registerDialogCloseCallback(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (this.multiple) {
          this.model[this.modelEntityProperty] = result;
          this.selectedRecords = result.map((record: any) => record[this.entityMainProperty]).join(', ');
        } else {
          this.model[this.modelEntityProperty] = result[0] || [];
          this.selectedRecords = result[0][this.entityMainProperty];
        }
        this.validateRequired();
      }
    });
  }

  clear() {
    this.selectedRecords = '';
    if (this.multiple) {
      this.model[this.modelEntityProperty] = [];
    } else {
      this.model[this.modelEntityProperty] = undefined;
    }
    this.validateRequired();
  }
}
