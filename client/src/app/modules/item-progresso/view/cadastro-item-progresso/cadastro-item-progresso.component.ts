import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { ItemProgresso } from './../../domain/item-progresso';
import { ItemProgressoService } from './../../service/item-progresso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-item-progresso',
  templateUrl: 'cadastro-item-progresso.component.html',
  styleUrls: ['./cadastro-item-progresso.component.css'],
  providers: [ItemProgressoService]
})
export class CadastroItemProgressoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  itemProgresso: ItemProgresso = new ItemProgresso;
  cores: any[] = ItemProgresso.CORES_ARR;
  @ViewChild('form') form;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private itemProgressoService: ItemProgressoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterItemProgresso(params.params['id']);
      }
    });
  }

  obterItemProgresso(id) {
    this.blockUI.start('Carregando...');
    this.itemProgressoService.get(id).subscribe(
      response => {
        this.itemProgresso = response;
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
    this.itemProgressoService.createOrUpdate(this.itemProgresso).subscribe(
      itemProgresso => {
        this.blockUI.stop();
        if (!this.itemProgresso._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/item-progresso']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/item-progresso']);
  }

}
