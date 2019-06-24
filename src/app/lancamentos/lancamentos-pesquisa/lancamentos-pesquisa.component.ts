import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { LancamentoFiltro } from './../lancamento.service';
import { LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  @ViewChild('tabela') tabela;
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  constructor(
    private auth: AuthService,
    private lancamentosService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentosService.pesquisar(this.filtro).subscribe(
      dados => {
        this.lancamentos = dados.lancamentos;
        this.totalRegistros = dados.total;
      },
      error => {
        this.errorHandler.handle(error);
      }
    );
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any): void {
    this.lancamentosService.excluir(lancamento.codigo).subscribe(
      () => {
        this.tabela.first = 0;
        this.pesquisar();
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento excluído com sucesso!'
        });
      },
      error => {
        this.errorHandler.handle(error);
      }
    );
  }
}
