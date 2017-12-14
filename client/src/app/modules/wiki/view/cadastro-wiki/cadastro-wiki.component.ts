import { AuthenticationService } from './../../../../core/service/authentication.service';
import { AppSettings } from './../../../../app.settings';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { Wiki } from './../../domain/wiki';
import { WikiService } from './../../service/wiki.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastro-wiki',
  templateUrl: 'cadastro-wiki.component.html',
  styleUrls: ['./cadastro-wiki.component.css'],
  providers: [WikiService]
})
export class CadastroWikiComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  wiki: Wiki = new Wiki;
  @ViewChild('form') form;
  public froalaOptions: Object = {
    placeholderText: 'Conteúdo',
    language: 'pt_br',
    imageUploadURL: AppSettings.API_ENDPOINT + '/wikis/upload-image',
    imageUploadMethod: 'POST',
    requestHeaders: {
      'Authorization': 'Bearer ' + this.authenticationService.getAuthorization()
    },
    imageManagerDeleteURL: AppSettings.API_ENDPOINT + '/wikis/delete-image'
  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customSnackBar: CustomSnackBarService,
    private wikiService: WikiService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterWiki(params.params['id']);
      }
    });
  }

  obterWiki(id) {
    this.blockUI.start('Carregando...');
    this.wikiService.get(id).subscribe(
      response => {
        this.wiki = response;
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
    this.wikiService.createOrUpdate(this.wiki).subscribe(
      wiki => {
        this.blockUI.stop();
        if (!this.wiki._id) {
          this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        } else {
          this.customSnackBar.open('Registro alterado com sucesso!', 'success');
        }
        this.router.navigate(['cadastros/wiki']);
      },
      error => {
        this.blockUI.stop();
        this.customSnackBar.open(error, 'danger');
      }
    );
  }

  cancelar() {
    this.router.navigate(['cadastros/wiki']);
  }

}
