import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { VersaoService } from './../../service/versao.service';
import { Versao } from './../../domain/versao';
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-versao',
  templateUrl: './cadastro-versao.component.html',
  providers: [VersaoService]
})
export class CadastroVersaoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  versao: Versao = new Versao;
  @ViewChild('form') form;
  public froalaOptions: Object = {
    imageUpload: false,
    imagePaste: false,
    toolbarButtons: ['bold', 'italic', 'underline'],
    placeholderText: 'Conteúdo',
    language: 'pt_br'
  };

  constructor(private location: Location,
    private versaoService: VersaoService,
    private router: Router,
    private route: ActivatedRoute,
    private customSnackBar: CustomSnackBarService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterVersao(params.params['id']);
      }
    });
  }

  obterVersao(id) {
    this.blockUI.start('Carregando...');
    this.versaoService.get(id).subscribe(
      response => {
        this.versao = response;
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
    this.versaoService.createOrUpdate(this.versao).subscribe(
      response => {
        this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        this.router.navigate(['/versoes']);
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
        this.blockUI.stop();
      }
    );
  }

  voltar() {
    this.location.back();
  }

}
