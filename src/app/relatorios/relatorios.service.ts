import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

import {MoneyHttp} from '../seguranca/money-http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date): Observable<any> {
    /*
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
     */
    let params = new HttpParams();
    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));
    return this.http.get<any>(`${this.lancamentosUrl}/relatorios/por-pessoa`, {  params, responseType: 'blob' });
  }
}
