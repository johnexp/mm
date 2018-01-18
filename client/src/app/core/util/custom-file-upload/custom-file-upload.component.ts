import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CustomSnackBarService } from './../snack-bar/custom-snack-bar.service';
import { AppSettings } from './../../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-custom-file-upload',
  templateUrl: './custom-file-upload.component.html',
  styleUrls: ['./custom-file-upload.component.css']
})
export class CustomFileUploadComponent implements AfterViewInit {

  // @Input() model: any;
  @Input() fieldLabel = 'Arquivo';
  @Input() modelFileProperty = 'arquivo';
  @Input() modelFileNameProperty = 'fileName';
  @Input() required: Boolean = false;
  @Input() form: any = {};
  @ViewChild('filePreview') filePreview: ElementRef;
  @ViewChild('inputFileHidden') inputFileHidden: NgModel;
  fileUrl: String;
  fileName: String = '';

  fileChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _file: String = '';

  modelChange: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _model: any;

  get file(): string {
    return this.fileChange.value;
  }

  @Input()
  set file(data: string) {
    this.fileChange.next(data);
    this.showFile();
  }

  get model(): any {
    return this.modelChange.value;
  }

  @Input()
  set model(data: any) {
    this.modelChange.next(data);
    this.showFile();
  }

  constructor(private customSnackBar: CustomSnackBarService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.required) {
      Promise.resolve(null).then(() =>
        this.form.form.addControl(this.inputFileHidden.name, this.inputFileHidden.control));
      this.changeDetectorRef.detectChanges();
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (!this.model[this.modelFileProperty]) {
          this.model[this.modelFileProperty] = {};
        }
        this.model[this.modelFileProperty].file = {
          filename: file.name,
          filetype: file.type,
          binary: file
        };
        this.model[this.modelFileProperty].fileName = file.name;
        this.showFile();
      };
    }
  }

  clearFile() {
    this.model[this.modelFileProperty] = {};
    this.filePreview.nativeElement.innerHTML = '';
    this.fileName = '';
    this.fileUrl = '';
  }

  showFile() {
    if (this.model[this.modelFileProperty]) {
      if (this.model[this.modelFileProperty].file) {
        this.fileName = this.model[this.modelFileProperty].fileName;
        const span = <HTMLSpanElement>(document.createElement('span'));
        span.innerHTML = this.model[this.modelFileProperty].file.filename;
        this.filePreview.nativeElement.innerHTML = '';
        this.filePreview.nativeElement.appendChild(span);
      } else if (this.model[this.modelFileProperty]._id) {
        this.fileName = this.model[this.modelFileProperty].fileName;
        this.fileUrl = AppSettings.SERVER_URL + this.model[this.modelFileProperty].filePath.split('public')[1];
        const span = <HTMLSpanElement>(document.createElement('span'));
        span.innerHTML = this.model[this.modelFileProperty].fileName;
        this.filePreview.nativeElement.innerHTML = '';
        this.filePreview.nativeElement.appendChild(span);
      }
    }
  }
}
