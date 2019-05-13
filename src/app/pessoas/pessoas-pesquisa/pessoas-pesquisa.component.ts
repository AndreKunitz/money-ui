import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  cols: any[];
  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pesquisar();
  }

  listar() {
    this.pessoaService.listar().subscribe(dados => {
      this.pessoas = dados.pessoas;
    });
  }

  pesquisar() {
    this.pessoaService.pesquisar(this.filtro).subscribe(dados => {
      this.pessoas = dados.pessoas;
      this.totalRegistros = dados.total;
    });
  }

}
