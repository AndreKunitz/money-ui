import { Component, OnInit } from '@angular/core';

import { saveAs } from 'file-saver';

import {RelatoriosService} from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {
  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatorioService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim).subscribe(
      relatorio => {
        saveAs(relatorio, `pdf report.pdf`);
      }
    );
  }

}
