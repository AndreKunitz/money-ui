import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
    });

    let params = new HttpParams().set('descricao', filtro.descricao);


    return this.http
                  .get<any[]>(`${this.lancamentosUrl}?resumo`, { headers, params } )
                  .pipe(
                    map(res => res['content'])
                  );
  }
}
