import { PaginaService } from './../../service/pagina.service';
import { CadastroPaginaComponent } from './../cadastro-pagina/cadastro-pagina.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-pagina-demonstrativo-ir',
  templateUrl: '../cadastro-pagina/cadastro-pagina.component.html',
  providers: [PaginaService]
})
export class CadastroPaginaDemonstrativoIRComponent extends CadastroPaginaComponent implements OnInit {

  ngOnInit() {
    this.tipoPagina = 'demonstrativo-ir';
    this.tituloPagina = 'Página Demonstrativo de IR';
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
