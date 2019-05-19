import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriasUrl = 'localhost:8080/categorias';
  private auth = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
  });

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<any> {
    return this.http.get<any>(`${this.categoriasUrl}`, { headers: this.auth });
  }
}
