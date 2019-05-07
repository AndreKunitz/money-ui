import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';



@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];

  ngOnInit() {
    this.pesquisar();
  }

  constructor(private lancamentosService: LancamentoService) { }

  pesquisar() {
    this.lancamentosService.pesquisar().subscribe(dados => this.lancamentos = dados);
  }
}
