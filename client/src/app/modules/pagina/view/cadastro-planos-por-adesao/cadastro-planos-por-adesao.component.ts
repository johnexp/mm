import { PaginaService } from './../../service/pagina.service';
import { CadastroPaginaComponent } from './../cadastro-pagina/cadastro-pagina.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-planos-por-adesao',
  templateUrl: '../cadastro-pagina/cadastro-pagina.component.html',
  providers: [PaginaService]
})
export class CadastroPlanosPorAdesaoComponent extends CadastroPaginaComponent implements OnInit {

  ngOnInit() {
    this.tipoPagina = 'planos-por-adesao';
    this.tituloPagina = 'Planos Por Adesão';
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
