import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import * as moment from 'moment';

import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCaterorias();
    this.carregarPessoas();
  }

  get editando(): Boolean {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).subscribe(
      dados => {
        this.lancamento = this.converterStringsParaData(dados);
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  carregarCaterorias() {
    this.categoriaService.listarTodas().subscribe(
      dados => {
        this.categorias = dados.map(categoria => {
          return { label: categoria.nome, value: categoria.codigo };
        });
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  carregarPessoas() {
    this.pessoaService.listar().subscribe(
      dados => {
        this.pessoas = dados['pessoas'].map(pessoa => {
          return { label: pessoa.nome, value: pessoa.codigo };
        });
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionarLancamento(this.lancamento).subscribe(
      lancamentoAdicionado => {
        this.messageService.add({
          severity: 'sucsses',
          detail: 'Lançamento cadastrado com sucesso!'
        });

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento).subscribe(
      lancamento => {
        this.lancamento = lancamento;
        this.messageService.add({
          severity: 'sucsses',
          detail: 'Lançamento alterado com sucesso!'
        });
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  converterStringsParaData(lancamento: Lancamento): Lancamento {
    lancamento.dataVencimento = moment(
      lancamento.dataVencimento,
      'YYYY-MM-DD'
    ).toDate();

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = moment(
        lancamento.dataVencimento,
        'YYYY-MM-DD'
      ).toDate();
    }

    return lancamento;
  }

  novo(form: FormControl) {
    form.reset();

    // Workarround para o form reset não anular o valor de lancamento.tipo
    setTimeout(
      function() {
        this.lancamento = new Lancamento();
      }.bind(this),
      1
    );

    this.router.navigate(['/lancamentos/novo']);
  }
}
