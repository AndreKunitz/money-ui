import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  exibindoMenu = false;

  constructor(public auth: AuthService, private logoutService: LogoutService) {}

  ngOnInit() {}

  logout() {
    this.logoutService.logout();
  }
}
