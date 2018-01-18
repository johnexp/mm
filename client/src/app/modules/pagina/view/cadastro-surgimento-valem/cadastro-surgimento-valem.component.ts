import { PaginaService } from './../../service/pagina.service';
import { CadastroPaginaComponent } from './../cadastro-pagina/cadastro-pagina.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-surgimento-valem',
  templateUrl: '../cadastro-pagina/cadastro-pagina.component.html',
  providers: [PaginaService]
})
export class CadastroSurgimentoValemComponent extends CadastroPaginaComponent implements OnInit {

  ngOnInit() {
    this.tipoPagina = 'surgimento-valem';
    this.tituloPagina = 'Surgimento da Valem';
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
