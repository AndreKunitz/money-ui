import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MoneyHttp } from './../seguranca/money-http';
import { Pessoa } from './../core/model';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pessoasUrl: string;

  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  listar(): Observable<any> {
    return this.http.get<any>(this.pessoasUrl).pipe(
      map(res => {
        const resultado = {
          pessoas: res.content,
          total: res.totalElements
        };
        return resultado;
      })
    );
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<any>(this.pessoasUrl, { params }).pipe(
      map(res => {
        const resultado = {
          pessoas: res.content,
          total: res.totalElements
        };
        return resultado;
      })
    );
  }

  excluir(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`);
  }

  alternarStatus(codigo: number, status: boolean): Observable<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, status, {
      headers
    });
  }

  adicionar(pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(this.pessoasUrl, pessoa);
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.http.get<any>(`${this.pessoasUrl}/${codigo}`);
  }

  atualizar(pessoa: Pessoa): Observable<any> {
    return this.http.put<any>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa);
  }
}
