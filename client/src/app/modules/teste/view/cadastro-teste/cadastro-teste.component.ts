import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Teste } from './../../domain/teste';
import { TesteService } from './../../service/teste.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Membro } from './../../../membro/domain/membro';

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
  dataInicioMinDate: Date = new Date;
  dataInicioMaxDate: Date = new Date('December 31, 2017 23:59:59');
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
    this.blockUI.start('Salvando...');
    this.testeService.createOrUpdate(this.teste).subscribe(
      teste => {
        this.blockUI.stop();
        if (!this.teste._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['teste']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['administracao/teste']);
  }

}
