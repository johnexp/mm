import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { ProdutoServico } from './../../domain/produto-servico';
import { ProdutoServicoService } from './../../service/produto-servico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { File } from './../../../../core/domain/file';

@Component({
  selector: 'app-cadastro-produto-servico',
  templateUrl: 'cadastro-produto-servico.component.html',
  styleUrls: ['./cadastro-produto-servico.component.css'],
  providers: [ProdutoServicoService]
})
export class CadastroProdutoServicoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  produtoServico: ProdutoServico = new ProdutoServico;
  @ViewChild('form') form;
  disabled: Boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private produtoServicoService: ProdutoServicoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterProdutoServico(params.params['id']);
      }
    });
    if (this.router.url.indexOf('/visualizar') > -1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  obterProdutoServico(id) {
    this.blockUI.start('Carregando...');
    this.produtoServicoService.get(id).subscribe(
      response => {
        this.produtoServico = response;
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
    if (this.produtoServico.imagem && this.produtoServico.imagem.file) {
      formData.append('image', this.produtoServico.imagem.file.binary);
    }
    formData.append('produtoServico', JSON.stringify(this.produtoServico));
    if (this.produtoServico._id) {
      formData.append('_id', this.produtoServico._id.toString());
    }
    this.blockUI.start('Salvando...');
    this.produtoServicoService.createOrUpdate(formData,
      produtoServico => {
        this.blockUI.stop();
        if (!produtoServico) {
          this.customSnackBar.open('Não foi possível salvar o registro.', 'danger');
        } else {
          if (!this.produtoServico._id) {
            this.customSnackBar.open('Registro salvo com sucesso!', 'success');
          } else {
            this.customSnackBar.open('Registro alterado com sucesso!', 'success');
          }
          this.router.navigate(['cadastros/produto-servico']);
        }
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/produto-servico']);
  }

}
