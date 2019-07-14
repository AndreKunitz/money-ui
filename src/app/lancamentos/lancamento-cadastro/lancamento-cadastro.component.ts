import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  // lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.configurarFormulario();

    this.title.setTitle('Novo lançamento');

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCaterorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  get editando(): Boolean {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).subscribe(
      dados => {
        // this.lancamento = this.converterStringsParaData(dados);
        this.formulario.patchValue(dados);
        this.atualizarTituloEdicao();
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

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionarLancamento(this.formulario.value).subscribe(
      lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento cadastrado com sucesso!'
        });

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value).subscribe(
      lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);

        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento alterado com sucesso!'
        });
        this.atualizarTituloEdicao();
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

  novo() {
    this.formulario.reset();

    // Workarround para o form reset não anular o valor de lancamento.tipo
    setTimeout(
      function() {
        this.lancamento = new Lancamento();
      }.bind(this),
      1
    );

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(
      `Edição de lançamento: ${this.formulario.get('descricao').value}`
    );
  }
}
