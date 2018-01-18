import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { AssuntoContato } from './../../domain/assunto-contato';
import { AssuntoContatoService } from './../../service/assunto-contato.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-assunto-contato',
  templateUrl: 'cadastro-assunto-contato.component.html',
  styleUrls: ['./cadastro-assunto-contato.component.css'],
  providers: [AssuntoContatoService]
})
export class CadastroAssuntoContatoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  assuntoContato: AssuntoContato = new AssuntoContato;
  @ViewChild('form') form;
  disabled: Boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private assuntoContatoService: AssuntoContatoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterAssuntoContato(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterAssuntoContato(id) {
    this.blockUI.start('Carregando...');
    this.assuntoContatoService.get(id).subscribe(
      response => {
        this.assuntoContato = response;
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
    this.assuntoContatoService.createOrUpdate(this.assuntoContato).subscribe(
      assuntoContato => {
        this.blockUI.stop();
        if (!this.assuntoContato._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/assunto-contato']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/assunto-contato']);
  }

}
