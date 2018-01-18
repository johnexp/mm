import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Parceiro } from './../../domain/parceiro';
import { ParceiroService } from './../../service/parceiro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { File } from './../../../../core/domain/file';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: 'cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css'],
  providers: [ParceiroService]
})
export class CadastroParceiroComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  parceiro: Parceiro = new Parceiro;
  @ViewChild('form') form;
  disabled: Boolean = false;
  tipoLista: string[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private parceiroService: ParceiroService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterParceiro(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

    this.obterValoresEnum('tipo').then((values) => {
      this.tipoLista = values;
    });
  }

  obterValoresEnum(campo) {
    return this.parceiroService.getEnum(campo).toPromise();
  }

  obterParceiro(id) {
    this.blockUI.start('Carregando...');
    this.parceiroService.get(id).subscribe(
      response => {
        this.parceiro = response;
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open(error, 'danger');
        this.blockUI.stop();
      }
    );
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    const formData = new FormData();
    if (this.parceiro.imagem && this.parceiro.imagem.file) {
      formData.append('image', this.parceiro.imagem.file.binary);
    }
    formData.append('parceiro', JSON.stringify(this.parceiro));
    if (this.parceiro._id) {
      formData.append('_id', this.parceiro._id.toString());
    }
    this.blockUI.start('Salvando...');
    this.parceiroService.createOrUpdate(formData,
      parceiro => {
        this.blockUI.stop();
        if (parceiro.error) {
          this.customSnackBar.open(parceiro.error, 'danger');
        } else {
          if (!this.parceiro._id) {
            this.customSnackBar.open('Registro salvo com sucesso!', 'success');
          } else {
            this.customSnackBar.open('Registro alterado com sucesso!', 'success');
          }
          this.router.navigate(['cadastros/parceiro']);
        }
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/parceiro']);
  }

}
