import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { routes } from './../../../../app.routes';
import { GenericService } from './../../../../core/service/generic.service';
import { MatSnackBar, MatDatepickerToggle } from '@angular/material';
import { VersaoService } from './../../service/versao.service';
import { Versao } from './../../domain/versao';
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-versao',
  templateUrl: './cadastro-versao.component.html',
  providers: [VersaoService, GenericService]
})
export class CadastroVersaoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  versao: Versao = new Versao;
  @ViewChild('form') form;

  constructor(private location: Location,
    private versaoService: VersaoService,
    private genericService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private customSnackBar: CustomSnackBarService) {
  }

  ngOnInit() {
    this.versao = new Versao;
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.versaoService.get({ id: params.params.id }).$observable.subscribe(
          response => {
            this.versao = response;
          },
          error => {
            this.customSnackBar.open('Não foi possível obter o registro');
          }
        )
      }
    });
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente');
      return;
    }
    this.versaoService.createOrUpdate(this.versao).$observable.subscribe(
      response => {
        this.customSnackBar.open('Registro salvo com sucesso!');
        this.router.navigate(['/versoes']);
      },
      error => {
        this.customSnackBar.open('Não foi possível salvar o registro!');
      }
    );
  }

  voltar() {
    this.location.back();
  }

}
