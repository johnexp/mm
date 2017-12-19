import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Teste } from './../../domain/teste';
import { TesteService } from './../../service/teste.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Membro } from './../../../membro/domain/membro';
import { File } from './../../../../core/domain/file';

@Component({
  selector: 'app-cadastro-teste',
  templateUrl: 'cadastro-teste.component.html',
  styleUrls: ['./cadastro-teste.component.css'],
  providers: [TesteService]
})
export class CadastroTesteComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  teste: Teste = new Teste;
  @ViewChild('form') form;
  disabled: Boolean = false;
  dataInicioMinDate: Date = new Date();
  dataInicioMaxDate: Date = new Date('2018-01-01T01:59:59.000Z');
  corLista: string[] = [];
  coresLista: string[] = [];
  selectCoresLista: string[] = [];
  membroSelectionColumns = [{
    columnDef: 'nome',
    header: 'Nome',
    cell: (row: Membro) => `${row.nome}`,
    filter: true,
    type: 'text'
  }];
  membrosSelectionColumns = [{
    columnDef: 'nome',
    header: 'Nome',
    cell: (row: Membro) => `${row.nome}`,
    filter: true,
    type: 'text'
  }];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private testeService: TesteService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterTeste(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

    this.obterValoresEnum('cor').then((values) => {
      this.corLista = values;
    });
    this.obterValoresEnum('cores').then((values) => {
      this.coresLista = values;
    });
    this.obterValoresEnum('selectCores').then((values) => {
      this.selectCoresLista = values;
    });
  }

  obterValoresEnum(campo) {
    return this.testeService.getEnum(campo).toPromise();
  }

  obterTeste(id) {
    this.blockUI.start('Carregando...');
    this.testeService.get(id).subscribe(
      response => {
        this.teste = response;
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
    if (this.teste.documento && this.teste.documento.file) {
      formData.append('file', this.teste.documento.file.binary);
    }
    if (this.teste.imagem && this.teste.imagem.file) {
      formData.append('image', this.teste.imagem.file.binary);
    }
    formData.append('teste', JSON.stringify(this.teste));
    if (this.teste._id) {
      formData.append('_id', this.teste._id.toString());
    }
    this.blockUI.start('Salvando...');
    this.testeService.createOrUpdate(formData,
      teste => {
        this.blockUI.stop();
        if (!teste) {
          this.customSnackBar.open('Não foi possível salvar o registro.', 'danger');
        } else {
          if (!this.teste._id) {
            this.customSnackBar.open('Registro salvo com sucesso!', 'success');
          } else {
            this.customSnackBar.open('Registro alterado com sucesso!', 'success');
          }
          this.router.navigate(['administracao/teste']);
        }
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/teste']);
  }

}
