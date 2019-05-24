import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';

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
    private messageService: MessageService
  ) {}

  ngOnInit() {}

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
}
