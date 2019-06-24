import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {}

  logout() {
    this.logoutService.logout();
  }
}
