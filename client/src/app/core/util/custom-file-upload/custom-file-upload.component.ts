import { CustomSnackBarService } from './../snack-bar/custom-snack-bar.service';
import { AppSettings } from './../../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-file-upload',
  templateUrl: './custom-file-upload.component.html',
  styleUrls: ['./custom-file-upload.component.css']
})
export class CustomFileUploadComponent {

  @Input() model: any;
  @Input() modelFileProperty = 'arquivo';
  @Input() modelFileNameProperty = 'nomeArquivo';
  @Input() required: Boolean = false;
  @Input() form: any = {};
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('filePreview') filePreview: ElementRef;
  fileUrl: String;
  fileChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _file: String = '';
  get file(): string {
    return this.fileChange.value;
  }
  @Input()
  set file(data: string) {
    this.fileChange.next(data);
    this.showFile();
  }

  constructor(private customSnackBar: CustomSnackBarService) {
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.arquivo = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
        this.showFile();
      };
    }
  }

  clearFile() {
    this.model[this.modelFileProperty] = null;
    this.model[this.modelFileNameProperty] = null;
    this.model.arquivo = null;
    this.filePreview.nativeElement.innerHTML = '';
    this.fileUrl = null;
  }

  showFile() {
    if (this.model.arquivo) {
      const span = <HTMLSpanElement>(document.createElement('span'));
      span.innerHTML = this.model.arquivo.filename;
      this.filePreview.nativeElement.innerHTML = '';
      this.filePreview.nativeElement.appendChild(span);
    } else if (this.model[this.modelFileProperty]) {
      this.fileUrl = AppSettings.SERVER_URL + this.model[this.modelFileProperty].split('public')[1];
      const span = <HTMLSpanElement>(document.createElement('span'));
      span.innerHTML = this.model[this.modelFileNameProperty];
      this.filePreview.nativeElement.innerHTML = '';
      this.filePreview.nativeElement.appendChild(span);
    }
  }
}
