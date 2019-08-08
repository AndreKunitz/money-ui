import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Observable<any> {
    return this.http.get<any>(
      `${this.lancamentosUrl}/estatisticas/por-categoria`
    );
  }

  lancamentosPorDia(): Observable<any> {
    return this.http.get<any>(`${this.lancamentosUrl}/estatisticas/por-dia`);
  }

}
