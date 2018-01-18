import { AppSettings } from './../../../app.settings';
import { GenericService } from './../../service/generic.service';
import { Event } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'rich-text-field',
  templateUrl: './rich-text-field.component.html',
  providers: [GenericService]
})
export class RichTextFieldComponent implements OnInit {

  @Input() modules: any;
  @Input() form: any;
  @Input() uploadPath: string = '/file/upload-image';
  @Input() name: string;
  @Input() label: string;
  @Input() required: Boolean = false;
  @Input() disabled: Boolean = false;
  @Input() readOnly: Boolean = false;
  @Input() maxLength: number = 2000;
  @Input() minLength: number = 0;
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ],
    imageDrop: true,
    imageResize: {
      modules: ['Resize', 'DisplaySize']
    }
  };
  cleanText: string = '';
  _modelChange = new BehaviorSubject({});

  get model(): any {
    return this._modelChange.value;
  }

  @Input('model')
  set model(data: any) {
    this._modelChange.next(data);
    if (data) {
      this.validateRequired();
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private genericService: GenericService) { }

  ngOnInit() {
    if (this.modules) {
      this.quillModules = this.modules;
    }
  }

  ngAfterViewInit() {
    this.validateRequired();
  }

  validateRequired() {
    if (this.required) {
      if (this.model) {
        let errors = { required: false, minLength: false, maxLength: false };
        if (this.required && this.model[this.name] === null || this.model[this.name] === '') {
          errors.required = true;
        } else {
          delete errors.required;
        }
        if (this.required && this.model[this.name] && this.model[this.name].replace(/<\/?[^>]+(>|$)/g, '').length < this.minLength) {
          errors.minLength = true;
        } else {
          delete errors.minLength;
        }
        if (this.model[this.name] && this.model[this.name].replace(/<\/?[^>]+(>|$)/g, '').length > this.maxLength) {
          errors.maxLength = true;
        } else {
          delete errors.maxLength;
        }
        errors = Object.keys(errors).length > 0 ? errors : null;
        const ctrl = new FormControl(this.name, {
          validators: [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]
        });
        Promise.resolve(null).then(() => {
          this.form.form.registerControl(this.name, ctrl);
          this.form.form.controls[this.name].setErrors(errors);
        });
      } else {
        if (!this.form.form.controls[this.name]) {
          Promise.resolve(null).then(() => {
            this.form.form.registerControl(this.name, new FormControl(this.name, {
              validators: [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]
            }));
          });
        } else {
          this.form.form.controls[this.name].setErrors(null);
        }
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  onContentChanged(event) {
    if (event.source !== 'api') {
      event.delta.ops.forEach(ops => {
        if (ops.insert && ops.insert.image) {
          this.uploadImage(ops.insert.image, (response) => {
            if (response) {
              Promise.resolve(null).then(() => {
                this.model[this.name] = this.model[this.name].replace(ops.insert.image, AppSettings.SERVER_URL + JSON.parse(response).link.split('/public')[1]);
              });
              this.changeDetectorRef.detectChanges();
            }
          });
        }
      });
      this.validateRequired();
    }
    if (this.model[this.name]) {
      this.cleanText = this.model[this.name].replace(/<\/?[^>]+(>|$)/g, '');
    }
  }

  uploadImage(data, callback) {
    const file = this.dataURLtoFile(data, 'rt-image.png');
    const formData = new FormData();
    formData.append('file', file);
    this.genericService.uploadImage(this.uploadPath, formData, callback);
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
