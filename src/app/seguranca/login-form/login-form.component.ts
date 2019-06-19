import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(usuario, senha) {
    this.authService.login(usuario, senha).subscribe(
      resp => {
        this.authService.armazernarToken(resp['access_token']);
        this.router.navigate(['/lancamentos']);
      },
      erro => {
        if (erro.status === 400 && erro.error['error'] === 'invalid_grant') {
          return this.errorHandler.handle('Usário ou senha inválida');
        }
        return this.errorHandler.handle(erro);
      }
    );
  }
}
