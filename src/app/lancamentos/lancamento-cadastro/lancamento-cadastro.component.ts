import { Component, OnInit } from '@angular/core';

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

  pessoas = [
    { label: 'André Kunitz', value: 1 },
    { label: 'Camila Russo', value: 2 }
  ];

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.carregarCaterorias();
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
}
