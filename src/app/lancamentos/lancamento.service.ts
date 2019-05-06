import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient) { }

    pesquisar() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
        })
      };

      return this.http.get(`${this.lancamentosUrl}?resumo`, httpOptions )
                      .subscribe((data) => {console.log(data); } );
    }
}
