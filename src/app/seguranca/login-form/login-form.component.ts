import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  login(usuario, senha) {
    this.authService
      .login(usuario, senha)
      .subscribe(
        resp => console.log(resp),
        erro => this.errorHandler.handle(erro)
      );
  }
}
