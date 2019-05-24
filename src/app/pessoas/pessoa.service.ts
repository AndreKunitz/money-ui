import { Pessoa } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pessoasUrl = 'http://localhost:8080/pessoas';
  private auth = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
  });

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get<any>(this.pessoasUrl, { headers: this.auth }).pipe(
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

    return this.http
      .get<any>(this.pessoasUrl, { headers: this.auth, params })
      .pipe(
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
    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, {
      headers: this.auth
    });
  }

  alternarStatus(codigo: number, status: boolean): Observable<void> {
    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, status, {
      headers: this.auth
    });
  }

  salvar(pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(this.pessoasUrl, pessoa, { headers: this.auth });
  }
}
