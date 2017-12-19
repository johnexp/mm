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

  // @Input() model: any;
  @Input() modelFileProperty = 'imagem';
  @Input() isBase64File: Boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('imagePreview') imagePreview: ElementRef;
  imageChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  modelChange: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _image: String = '';
  private _model: any;
  imageData: any = '';

  get model(): any {
    return this.modelChange.value;
  }

  @Input()
  set model(data: any) {
    this.modelChange.next(data);
    this.showImage();
  }

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
      if (file.type !== '' && (/(gif|jpg|jpeg|tiff|png)$/i).test(file.type) === false) {
        this.customSnackBar.open('Somente arquivos do tipo imagem são permitidos!', 'warn');
        event.preventDefault();
        return;
      }
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
        this.imageData = reader.result.split(',')[1];
        this.model[this.modelFileProperty].fileName = file.name;
        this.isBase64File = true;
        this.showImage();
      };
    }
  }

  clearFile() {
    this.model[this.modelFileProperty] = null;
    // this.model.arquivo = null;
    this.imagePreview.nativeElement.innerHTML = '';
  }

  showImage() {
    if (this.model[this.modelFileProperty]) {
      if (this.model[this.modelFileProperty].file) {
        const image = new Image;
        if (this.isBase64File) {
          image.src = 'data:' + this.model[this.modelFileProperty].file.filetype + ';base64,' + this.imageData;
        } else {
          image.src = AppSettings.SERVER_URL + '/upload/' + this.imageData;
        }
        this.imagePreview.nativeElement.innerHTML = '';
        this.imagePreview.nativeElement.appendChild(image);
      } else if (this.model[this.modelFileProperty]._id) {
        const image = new Image;
        image.src = AppSettings.SERVER_URL + this.model[this.modelFileProperty].filePath.split('public')[1];
        this.imagePreview.nativeElement.innerHTML = '';
        this.imagePreview.nativeElement.appendChild(image);
      }
    }
  }
}
