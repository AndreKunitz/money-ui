import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Observable<any> {
    return this.http.get<any>(`${this.categoriasUrl}`);
  }
}
