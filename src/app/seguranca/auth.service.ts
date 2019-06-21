import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthToeknUrl = 'http://localhost:8080/oauth/token';
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic YW5ndWxhcjphbmd1bGFy'
  });

  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<void>(this.oauthToeknUrl, body, {
      headers: this.headers,
      withCredentials: true
    });
  }

  obterNovoAccessToken() {
    const body = `grant_type=refresh_token`;

    return this.http
      .post<void>(this.oauthToeknUrl, body, {
        headers: this.headers,
        withCredentials: true
      })
      .subscribe(resp => {
        this.armazernarToken(resp['access_token']);
        console.log('Novo access token');
      });
  }

  armazernarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazernarToken(token);
    }
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
}
