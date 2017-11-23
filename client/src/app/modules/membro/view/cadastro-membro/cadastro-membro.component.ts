import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Membro } from './../../domain/membro';
import { MembroService } from './../../service/membro.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-membro',
  templateUrl: 'cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.css'],
  providers: [MembroService]
})
export class CadastroMembroComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  membro: Membro = new Membro;
  @ViewChild('form') form;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('imagePreview') imagePreview: ElementRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private membroService: MembroService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterMembro(params.params['id']);
      }
    });
  }

  obterMembro(id) {
    this.blockUI.start('Carregando...');
    this.membroService.get({ id: id }).$observable.subscribe(
      response => {
        this.membro = response;
        this.exibirImagem();
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open('Não foi possível obter o registro', 'danger');
        this.blockUI.stop();
      }
    );
  }

  exibirImagem() {
    if (this.membro.foto) {
      let image = new Image;
      image.src = 'data:' + this.membro.foto.filetype + ';base64,' + this.membro.foto.value;
      this.imagePreview.nativeElement.innerHTML = '';
      this.imagePreview.nativeElement.appendChild(image);
    }
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Salvando...');
    this.membroService.createOrUpdate(this.membro).$observable.subscribe(
      membro => {
        this.blockUI.stop();
        if (!this.membro._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['membro']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

  salvarFoto(membro) {
    membro.foto = this.membro.foto;
    this.membroService.salvarFoto(membro).$observable.subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  cancelar() {
    this.router.navigate(['membro']);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if (file.type != '' && (/(gif|jpg|jpeg|tiff|png)$/i).test(file.type) == false) {
        this.customSnackBar.open('Somente arquivos do tipo imagem são permitidos!', 'warn');
        event.preventDefault();
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.membro.foto = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
        this.exibirImagem();
      };
    }
  }

  clearFile() {
    this.membro.foto = null;
    this.imagePreview.nativeElement.innerHTML = '';
  }
}
