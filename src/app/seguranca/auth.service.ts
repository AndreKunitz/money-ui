import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthTokenUrl: string;
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic YW5ndWxhcjphbmd1bGFy'
  });

  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<void>(this.oauthTokenUrl, body, {
      headers: this.headers,
      withCredentials: true
    });
  }

  obterNovoAccessToken2() {
    const body = `grant_type=refresh_token`;

    return this.http
      .post<void>(this.oauthTokenUrl, body, {
        headers: this.headers,
        withCredentials: true
      })
      .subscribe(resp => {
        this.armazenarToken(resp['access_token']);
        console.log('Novo access token');
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http
      .post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
}
