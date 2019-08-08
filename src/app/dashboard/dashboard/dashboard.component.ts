import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  lineChartData: any;
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? dataset.label + ': ' : '';
          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria().subscribe(dados => {
      this.pieChartData = {
        labels: dados.map(dado => dado.categoria.nome),
        datasets: [
          {
            data: dados.map(dado => dado.total),
            backgroundColor: [
              '#FF9900',
              '#109618',
              '#990099',
              '#3B3EAC',
              '#0099C6',
              '#DD4477',
              '#3366CC',
              '#DC3912'
            ]
          }
        ]
      };
    });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia().subscribe(dados => {
      const diasDoMes = this.configurarDiasMes();
      const totaisReceitas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tipo === 'RECEITA'),
        diasDoMes
      );
      const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tipo === 'DESPESA'),
        diasDoMes
      );
      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC'
          },
          {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00'
          }
        ]
      };
    });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    const dadosConvertidos = this.converterSrtingsParaDatas(dados);
    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  configurarDiasMes() {
    const mesReferencia = new Date();
    // Mês atual + 1
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    // Pega o último dia do mês anterior
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();
    const dias: number[] = [];
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

  converterSrtingsParaDatas(dados: Array<any>): Array<any> {
    const dadosConvertidos = dados;
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
    return dadosConvertidos;
  }
}
