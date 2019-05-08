import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  lancamentos = [];

  ngOnInit() {
    this.listar();
  }

  constructor(private lancamentosService: LancamentoService) { }

  listar() {
    this.lancamentosService.listar()
                            .subscribe(dados => this.lancamentos = dados);
  }

  pesquisar() {
    this.lancamentosService.pesquisar({ descricao: this.descricao })
                            .subscribe(dados => this.lancamentos = dados);
  }
}
