import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';

import { PessoaService } from '../pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Nova pessoa');

    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando(): Boolean {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).subscribe(
      dados => {
        this.pessoa = dados;
        this.atualizarTituloEdicao();
      },
      erro => {
        this.errorHandlerService.handle(erro);
      }
    );
  }

  salvar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa).subscribe(
      () => {
        this.messageService.add({
          severity: 'sucsses',
          detail: 'Pessoa cadastrada com sucesso!'
        });
      },
      erro => {
        this.errorHandlerService.handle(erro);
      }
    );

    form.reset();
    this.pessoa = new Pessoa();
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
