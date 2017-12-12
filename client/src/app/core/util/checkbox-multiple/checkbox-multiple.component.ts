import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-multiple',
  templateUrl: './checkbox-multiple.component.html',
  styleUrls: ['./checkbox-multiple.component.css']
})
export class CheckboxMultipleComponent implements AfterViewInit {

  @Input() modelField: string;
  @Input() options: any[] = [];
  @Input() fieldLabel: string;
  @Input() required: Boolean = false;
  @Input() form: any;
  private _model: any;
  modelChange: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.validateCheckboxList();
  }

  validateCheckboxList() {
    if (this.required) {
      if (this.model[this.modelField].length === 0) {
        const ctrl = new FormControl(this.modelField, {
          validators: Validators.required
        });
        Promise.resolve(null).then(() => {
          this.form.form.registerControl(this.modelField, ctrl);
          this.form.form.controls[this.modelField].setErrors({ 'incorrect': true });
        });
      } else {
        this.form.form.controls[this.modelField].setErrors(null);
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  changeSelection(item) {
    const itemIndex = this.model[this.modelField].indexOf(item);
    if (itemIndex > -1) {
      this.model[this.modelField].splice(itemIndex, 1);
    } else {
      this.model[this.modelField].push(item);
    }
    this.validateCheckboxList();
  }

  get model(): string {
    return this.modelChange.value;
  }

  @Input()
  set model(model: string) {
    this.modelChange.next(model);
    this.validateCheckboxList();
  }

}
