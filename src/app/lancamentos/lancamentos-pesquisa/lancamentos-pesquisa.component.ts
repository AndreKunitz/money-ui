import { LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  @ViewChild('tabela') tabela;
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  ngOnInit() {
    console.log(this.tabela);
  }

  constructor(
    private lancamentosService: LancamentoService,
    private toasty: ToastyService
  ) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentosService.pesquisar(this.filtro).subscribe(dados => {
      this.lancamentos = dados.lancamentos;
      this.totalRegistros = dados.total;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any): void {
    this.lancamentosService.excluir(lancamento.codigo).subscribe(() => {
      this.tabela.first = 0;
      this.pesquisar();

      this.toasty.success('Lançamento excluído com sucesso!');
    });
  }
}
