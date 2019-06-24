import { ErrorHandlerService } from './../core/error-handler.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { MoneyHttp } from './money-http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private tokenRevokeUrl: string;

  constructor(
    private http: MoneyHttp,
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.tokenRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http
      .delete(this.tokenRevokeUrl, { withCredentials: true })
      .subscribe(
        () => {
          this.auth.limparAccessToken(), this.router.navigate(['/login']);
        },
        erro => this.errorHandler.handle(erro)
      );
  }
}
