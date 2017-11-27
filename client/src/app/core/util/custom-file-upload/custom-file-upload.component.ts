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
  @Input() modelFileProperty: string = 'arquivo';
  @Input() modelFileNameProperty: string = 'nomeArquivo';
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('filePreview') filePreview: ElementRef;
  fileChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _file: string = '';
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
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
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
    this.model.arquivo = null;
    this.filePreview.nativeElement.innerHTML = '';
  }

  showFile() {
    if (this.model[this.modelFileProperty]) {
      let link = <HTMLAnchorElement>(document.createElement('a'));
      link.target = '_blank';
      link.href = AppSettings.SERVER_URL + this.model[this.modelFileProperty].split('public')[1];
      link.download = this.model[this.modelFileNameProperty];
      link.innerHTML = this.model[this.modelFileNameProperty];
      this.filePreview.nativeElement.innerHTML = '';
      this.filePreview.nativeElement.appendChild(link);
    } else if (this.model.arquivo) {
      let span = <HTMLSpanElement>(document.createElement('span'));
      span.innerHTML = this.model.arquivo.filename;
      this.filePreview.nativeElement.innerHTML = '';
      this.filePreview.nativeElement.appendChild(span);
    }
  }
}
