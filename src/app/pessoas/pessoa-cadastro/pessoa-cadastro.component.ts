import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import {Contato, Pessoa} from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
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
    private router: Router,
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

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.adicionar(this.pessoa).subscribe(
      pessoaAdicionada => {
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa cadastrada com sucesso!'
        });

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      },
      erro => {
        this.errorHandlerService.handle(erro);
      }
    );
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.pessoa).subscribe(
      pessoa => {
        this.pessoa = pessoa;
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa alterada com sucesso!'
        });
        this.atualizarTituloEdicao();
      },
      erro => {
        this.errorHandlerService.handle(erro);
      }
    );
  }

  novo(form: FormControl) {
    form.reset();
    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }


}
