import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient) { }

  pesquisar(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
      })
    };

    return this.http
                  .get<any[]>(`${this.lancamentosUrl}?resumo`, httpOptions)
                  .pipe(
                    map(res => res['content'])
                  );
  }
}
