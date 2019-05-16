import { LancamentoService } from './lancamentos/lancamento.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastyModule } from 'ng2-toasty';

import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToastyModule.forRoot(),

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
