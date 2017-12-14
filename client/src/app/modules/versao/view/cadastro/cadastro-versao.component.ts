import { DialogTicketComponent } from './dialog-ticket/dialog-ticket.component';
import { MatDialog } from '@angular/material';
import { Ticket } from './../../domain/ticket';
import { GenericDatabase } from './../../../../core/util/data-table/generic-database';
import { CustomSnackBarService } from './../../../../core/util/snack-bar/custom-snack-bar.service';
import { VersaoService } from './../../service/versao.service';
import { Versao } from './../../domain/versao';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare const $;

@Component({
  selector: 'app-cadastro-versao',
  templateUrl: './cadastro-versao.component.html',
  providers: [VersaoService]
})
export class CadastroVersaoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  versao: Versao = new Versao;
  @ViewChild('form') form;
  databaseTickets = new GenericDatabase;
  displayedTicketsColumns = [
    { columnDef: 'ticket', header: 'Ticket', cell: (row: Ticket) => `${row.ticket}` },
    { columnDef: 'url', header: 'URL', cell: (row: Ticket) => `${row.url}` },
    { columnDef: 'descricao', header: 'Descrição', cell: (row: Ticket) => `${row.descricao}`, escapeHtml: true }
  ];
  public froalaOptions: Object = {
    imageUpload: false,
    imagePaste: false,
    toolbarButtons: ['bold', 'italic', 'underline'],
    placeholderText: 'Conteúdo',
    language: 'pt_br',
    quickInsertButtons: [],
    enter: $.FroalaEditor.ENTER_BR
  };

  constructor(private location: Location,
    private versaoService: VersaoService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private customSnackBar: CustomSnackBarService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterVersao(params.params['id']);
      }
    });
  }

  obterVersao(id) {
    this.blockUI.start('Carregando...');
    this.versaoService.get(id).subscribe(
      response => {
        this.versao = response;
        this.versao.tickets = this.versao.tickets || [];
        this.databaseTickets = new GenericDatabase;
        this.databaseTickets.data = this.versao.tickets;
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
    this.versaoService.createOrUpdate(this.versao).subscribe(
      response => {
        this.customSnackBar.open('Registro salvo com sucesso!', 'success');
        this.router.navigate(['cadastros/versoes']);
        this.blockUI.stop();
      },
      error => {
        this.customSnackBar.open('Não foi possível salvar o registro!', 'danger');
        this.blockUI.stop();
      }
    );
  }

  voltar() {
    this.location.back();
  }

  abrirDialogTicket(ticket?: Ticket): void {
    if (!ticket) {
      ticket = new Ticket;
    } else {
      // clona o ticket para não editar o objeto no grid
      ticket = JSON.parse(JSON.stringify(ticket));
    }
    const dialogRef = this.dialog.open(DialogTicketComponent, {
      width: '700px',
      data: { ticket: ticket }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adicionarTicket(result);
      }
    });
  }

  adicionarTicket(ticket: Ticket) {
    if (ticket._id == null) {
      ticket._id = '___' + Math.random().toString(36).substring(7);
      this.versao.tickets.push(ticket);
    } else {
      const indexTicketAlterado = this.versao.tickets.findIndex(ticketExistente => ticket._id === ticketExistente._id);
      this.versao.tickets.splice(indexTicketAlterado, 1);
      this.databaseTickets = new GenericDatabase;
      this.databaseTickets.data = this.versao.tickets;
      this.changeDetectorRef.detectChanges();
      this.versao.tickets.splice(indexTicketAlterado, 0, ticket);
    }
    this.databaseTickets = new GenericDatabase;
    this.databaseTickets.data = this.versao.tickets;
  }

  removerTicket(idTicket) {
    const index = this.versao.tickets.findIndex(ticket => ticket._id === idTicket);
    this.versao.tickets.splice(index, 1);
    this.databaseTickets = new GenericDatabase;
    this.databaseTickets.data = this.versao.tickets;
  }

}
