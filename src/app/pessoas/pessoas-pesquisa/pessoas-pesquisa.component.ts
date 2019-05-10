import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  cols: any[];
  pessoas = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.pessoaService.listar().subscribe(dados => {
      this.pessoas = dados.pessoas;
    });
  }
}
