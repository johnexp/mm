import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Sobre } from './../../domain/sobre';
import { SobreService } from './../../service/sobre.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-sobre-portal',
  templateUrl: 'cadastro-sobre-portal.component.html',
  styleUrls: ['./cadastro-sobre-portal.component.css'],
  providers: [SobreService]
})
export class CadastroSobrePortalComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  sobre: Sobre = new Sobre;
  @ViewChild('form') form;
  public froalaOptions: Object = {
    imageUpload: false,
    imagePaste: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'fontSize', 'paragraphFormat', 'insertHR', 'align'],
    placeholderText: 'Conteúdo',
    language: 'pt_br'
  };

  constructor(private router: Router,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private sobreService: SobreService) {
  }

  ngOnInit() {
    this.obterSobre();
  }

  obterSobre() {
    this.blockUI.start('Carregando...');
    this.sobreService.get().subscribe(
      response => {
        if (response) {
          this.sobre = response;
        }
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open('Não foi possível obter o registro', 'danger');
        this.blockUI.stop();
      }
    );
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    this.blockUI.start('Salvando...');
    this.sobreService.createOrUpdate(this.sobre).subscribe(
      sobre => {
        this.blockUI.stop();
        if (!this.sobre._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['sobre']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

}
