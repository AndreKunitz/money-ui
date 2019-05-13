import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() { }

  listar() {
    this.pessoaService.listar().subscribe(dados => {
      this.pessoas = dados.pessoas;
    });
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).subscribe(dados => {
      this.pessoas = dados.pessoas;
      this.totalRegistros = dados.total;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
