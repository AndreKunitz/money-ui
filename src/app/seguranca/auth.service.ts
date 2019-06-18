import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthToeknUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic YW5ndWxhcjphbmd1bGFy'
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<void>(this.oauthToeknUrl, body, { headers });
  }
}
