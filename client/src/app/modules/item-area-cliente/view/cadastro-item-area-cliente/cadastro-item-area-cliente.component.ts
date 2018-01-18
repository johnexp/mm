import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { ItemAreaCliente } from './../../domain/item-area-cliente';
import { ItemAreaClienteService } from './../../service/item-area-cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-item-area-cliente',
  templateUrl: 'cadastro-item-area-cliente.component.html',
  styleUrls: ['./cadastro-item-area-cliente.component.css'],
  providers: [ItemAreaClienteService]
})
export class CadastroItemAreaClienteComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  itemAreaCliente: ItemAreaCliente = new ItemAreaCliente;
  @ViewChild('form') form;
  disabled: Boolean = false;
  corLista: any[] = ItemAreaCliente.CORES_ARR;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private itemAreaClienteService: ItemAreaClienteService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterItemAreaCliente(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  obterItemAreaCliente(id) {
    this.blockUI.start('Carregando...');
    this.itemAreaClienteService.get(id).subscribe(
      response => {
        this.itemAreaCliente = response;
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
    this.itemAreaClienteService.createOrUpdate(this.itemAreaCliente).subscribe(
      itemAreaCliente => {
        this.blockUI.stop();
        if (!this.itemAreaCliente._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/item-area-cliente']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/item-area-cliente']);
  }

}
