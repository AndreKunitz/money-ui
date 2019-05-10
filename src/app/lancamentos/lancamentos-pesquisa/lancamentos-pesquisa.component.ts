import { LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  ngOnInit() {
  }

  constructor(private lancamentosService: LancamentoService) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentosService.pesquisar(this.filtro)
      .subscribe(dados => {
        this.lancamentos = dados.lancamentos;
        this.totalRegistros = dados.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
