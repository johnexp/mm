import { CustomSnackBarService } from './../snack-bar/custom-snack-bar.service';
import { AppSettings } from './../../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  @Input() model: any;
  @Input() modelFileProperty = 'imagem';
  @Input() isBase64File: Boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('imagePreview') imagePreview: ElementRef;
  imageChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _image: String = '';
  get image(): string {
    return this.imageChange.value;
  }
  @Input()
  set image(data: string) {
    this.imageChange.next(data);
    this.showImage();
  }

  constructor(private customSnackBar: CustomSnackBarService) {
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== '' && (/(gif|jpg|jpeg|tiff|png)$/i).test(file.type) == false) {
        this.customSnackBar.open('Somente arquivos do tipo imagem são permitidos!', 'warn');
        event.preventDefault();
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model[this.modelFileProperty] = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
        this.isBase64File = true;
        this.showImage();
      };
    }
  }

  clearFile() {
    this.model[this.modelFileProperty] = null;
    this.model.arquivo = null;
    this.imagePreview.nativeElement.innerHTML = '';
  }

  showImage() {
    if (this.model[this.modelFileProperty]) {
      const image = new Image;
      if (this.isBase64File) {
        image.src = 'data:' + this.model[this.modelFileProperty].filetype + ';base64,' + this.model[this.modelFileProperty].value;
      } else {
        image.src = AppSettings.SERVER_URL + '/upload/' + this.model[this.modelFileProperty].value;
      }
      this.imagePreview.nativeElement.innerHTML = '';
      this.imagePreview.nativeElement.appendChild(image);
    } else if (this.model.arquivo) {
      const image = new Image;
      image.src = AppSettings.SERVER_URL + this.model.arquivo.split('public')[1];
      this.imagePreview.nativeElement.innerHTML = '';
      this.imagePreview.nativeElement.appendChild(image);
    }
  }
}
