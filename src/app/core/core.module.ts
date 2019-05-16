import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ToastyModule } from 'ng2-toasty';

import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ToastyModule.forRoot()],
  exports: [NavbarComponent, ToastyModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule {}
