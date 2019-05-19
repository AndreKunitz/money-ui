import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';

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
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.carregarCaterorias();
    this.carregarPessoas();
  }

  salvar(from: FormControl) {
    console.log(this.lancamento);
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
}
