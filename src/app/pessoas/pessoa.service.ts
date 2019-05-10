import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private pessoasUrl = 'http://localhost:8080/pessoas';
  private auth = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
  });

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any>(this.pessoasUrl, { headers: this.auth }).pipe(
      map(res => {
        const resultado = {
          pessoas: res.content,
          total: res.totalElements
        };
        return resultado;
      }));
  }

  pesquisar() { }

}
