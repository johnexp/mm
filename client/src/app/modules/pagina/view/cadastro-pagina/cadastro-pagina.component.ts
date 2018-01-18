import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Pagina } from './../../domain/pagina';
import { PaginaService } from './../../service/pagina.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthenticationService } from './../../../../core/service/authentication.service';
import { AppSettings } from './../../../../app.settings';

@Component({
  selector: 'app-cadastro-pagina',
  templateUrl: 'cadastro-pagina.component.html',
  styleUrls: ['./cadastro-pagina.component.css'],
  providers: [PaginaService]
})
export class CadastroPaginaComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  tipoPagina: string;
  tituloPagina: string;
  pagina: Pagina = new Pagina;
  @ViewChild('form') form;
  disabled: Boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    protected customSnackBar: CustomSnackBarService,
    private paginaService: PaginaService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  obterPagina() {
    this.blockUI.start('Carregando...');
    this.paginaService.getByPagina(this.tipoPagina).subscribe(
      response => {
        if (response) {
          this.pagina = response;
        }
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open(error, 'danger');
        this.blockUI.stop();
      }
    );
  }

  salvar() {
    this.blockUI.start('Salvando...');
    this.pagina.pagina = this.tipoPagina;
    this.paginaService.createOrUpdate(this.pagina, this.tipoPagina).subscribe(
      pagina => {
        this.blockUI.stop();
        if (!this.pagina._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

}
