import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { AuthService } from './../seguranca/auth.service';
import { SegurancaRoutingModule } from '../seguranca/seguranca-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MoneyHttp } from '../seguranca/money-http';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    GrowlModule,
    ConfirmDialogModule,
    RouterModule,
    SegurancaRoutingModule
  ],
  exports: [NavbarComponent, GrowlModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    LancamentoService,
    PessoaService,
    AuthService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    MoneyHttp
  ]
})
export class CoreModule {}
