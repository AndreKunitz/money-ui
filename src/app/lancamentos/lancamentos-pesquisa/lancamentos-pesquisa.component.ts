import { LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro(); 
  lancamentos = [];

  ngOnInit() {
    this.pesquisar();
  }

  constructor(private lancamentosService: LancamentoService) { }

  pesquisar() {
    this.lancamentosService.pesquisar(this.filtro)
      .subscribe(dados => this.lancamentos = dados.lancamentos);
  }
}
