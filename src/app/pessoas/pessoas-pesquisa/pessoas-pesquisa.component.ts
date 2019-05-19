import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  @ViewChild('tabela') tabela;
  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  listar() {
    this.pessoaService.listar().subscribe(dados => {
      this.pessoas = dados.pessoas;
    });
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).subscribe(dados => {
      this.pessoas = dados.pessoas;
      this.totalRegistros = dados.total;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any): void {
    this.pessoaService.excluir(pessoa.codigo).subscribe(
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

  alternarStatus(pessoa: any, event: LazyLoadEvent): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService
      .alternarStatus(pessoa.codigo, novoStatus)
      .subscribe(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';
        pessoa.ativa = novoStatus;

        this.tabela.first = 0;
        this.pesquisar();
        this.messageService.add({
          severity: 'success',
          detail: `${pessoa.nome} ${acao} com sucesso!`
        });
      });
  }
}
