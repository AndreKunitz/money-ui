import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentosUrl = 'http://localhost:8080/lancamentos';
  private auth = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
  });

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    const httpOptions = { headers: this.auth };

    return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`, httpOptions)
      .pipe(
        map(res => res['content'])
      );
  }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    const httpOptions = {
      headers: this.auth,
      params: new HttpParams().set('descricao', filtro.descricao)
    };

    return this.http
      .get<any[]>(`${this.lancamentosUrl}?resumo`, httpOptions)
      .pipe(
        map(res => res['content'])
      );
  }
}
