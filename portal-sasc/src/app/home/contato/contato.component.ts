import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { HomeService } from './../../service/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  contato: any = {};
  result: String = null;
  severity: String = 'success';
  @ViewChild('form') form;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
  }

  enviarContato() {
    if (!this.form.valid) {
      this.showError('Campos obrigatórios não preenchidos!');
      return;
    }
    this.blockUI.start('Enviando');
    this.homeService.sendContact(this.contato).subscribe(
      response => {
        this.showSuccess();
        this.clearForm();
        this.blockUI.stop();
      },
      error => {
        this.showError();
        this.clearForm();
        this.blockUI.stop();
      }
    );
  }

  clearForm() {
    this.contato = {};
    this.form.resetForm();
  }

  showError(msg?) {
    this.result = msg || 'Não foi possível enviar seu contato. Tente novamente mais tarde.';
    this.severity = 'danger';
    setTimeout(() => {
      this.result = null;
    }, 10000);
  }

  showSuccess(msg?) {
    this.result = 'Seu contato foi enviado com sucesso.';
    this.severity = 'success';
    setTimeout(() => {
      this.result = null;
    }, 10000);
  }

}
