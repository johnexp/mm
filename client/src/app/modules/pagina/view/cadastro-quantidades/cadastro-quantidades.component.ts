import { PaginaService } from './../../service/pagina.service';
import { CadastroPaginaComponent } from './../cadastro-pagina/cadastro-pagina.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-quantidades',
  templateUrl: '../cadastro-pagina/cadastro-pagina.component.html',
  providers: [PaginaService]
})
export class CadastroQuantidadesComponent extends CadastroPaginaComponent implements OnInit {

  ngOnInit() {
    this.tipoPagina = 'quantidades';
    this.tituloPagina = 'Quantidade de Municípios, Vidas, Parceiros...?';
    this.obterPagina();
    super.ngOnInit();
  }

  salvar() {
    if (!this.form.valid) {
      this.customSnackBar.open('O formulário não foi preenchido corretamente', 'warn');
      return;
    }
    super.salvar();
  }

}
