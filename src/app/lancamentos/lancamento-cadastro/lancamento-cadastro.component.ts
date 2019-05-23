import { MessageService } from 'primeng/components/common/messageservice';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Lancamento } from 'src/app/core/model';
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
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarCaterorias();
    this.carregarPessoas();
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
    this.lancamentoService.adicionarLancamento(this.lancamento).subscribe(
      () => {
        this.messageService.add({
          severity: 'sucsses',
          detail: 'Lançamento cadastrado com sucesso!'
        });
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );

    form.reset();
    this.lancamento = new Lancamento();
  }
}
