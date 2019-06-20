import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { Lancamento } from './../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set(
        'dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }

    if (filtro.dataVencimentoFim) {
      params = params.set(
        'dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }

    return this.http
      .get<any>(`${this.lancamentosUrl}?resumo`, { params: params })
      .pipe(
        map(res => {
          const resultado = {
            lancamentos: res['content'],
            total: res.totalElements
          };

          return resultado;
        })
      );
  }

  excluir(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`);
  }

  adicionarLancamento(lancamento: Lancamento): Observable<any> {
    return this.http.post<any>(this.lancamentosUrl, lancamento);
  }

  atualizar(lancamento: Lancamento): Observable<any> {
    return this.http.put<any>(
      `${this.lancamentosUrl}/${lancamento.codigo}`,
      lancamento
    );
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.http.get<any>(`${this.lancamentosUrl}/${codigo}`);
  }
}
