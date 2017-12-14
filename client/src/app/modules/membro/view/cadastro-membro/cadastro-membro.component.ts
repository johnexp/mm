import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Membro } from './../../domain/membro';
import { MembroService } from './../../service/membro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  imagem: string;

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
    this.membroService.get(id).subscribe(
      response => {
        this.membro = response;
        this.imagem = this.membro.arquivo;
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
    this.membroService.createOrUpdate(this.membro).subscribe(
      membro => {
        this.blockUI.stop();
        if (!this.membro._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/membro']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/membro']);
  }
}
