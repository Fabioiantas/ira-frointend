import { LicencaEntidadeService } from './../../services/licenca-entidade.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Color } from 'ng2-charts';
import { LicencaAmbientalService } from 'src/app/services/licenca-ambiental.service';
import { LicencaAmbiental } from 'src/app/models/licencaAmbiental';
import { LicencaEntidade } from 'src/app/models/licencaEntidade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  heading = 'SISTEMA - AMBIENTAL';
  subheading = 'Portal para programação de produtos farmacos.';
  icon = 'fa fa-medkit icon-gradient bg-tempting-azure';
  pageSize = 2;
  searchTerm: any;
  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };

  countries = [
    {
      id: 1,
      name: '2ª Campanha de Farmaco 2020',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      id: 2,
      name: '1ª Campanha de Farmaco 2020',
      flag: 'c/c3/Flag_of_France.svg',
      area: 640679,
      population: 64979548
    },
    {
      id: 3,
      name: '2ª Campanha de Farmaco 2019',
      flag: 'b/ba/Flag_of_Germany.svg',
      area: 357114,
      population: 82114224
    },
    {
      id: 4,
      name: '1ª Campanha de Farmaco 2019',
      flag: '5/5c/Flag_of_Portugal.svg',
      area: 92090,
      population: 10329506
    }
  ];

  public datasets = [
    {
      label: 'Produtos Programados',
      data: [65, 59, 80, 81, 46, 55, 38, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets2 = [
    {
      label: 'Produtos Programados',
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets3 = [
    {
      label: 'Produtos Programados',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },

    }
  ];
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(247, 185, 36, 0.2)',
      borderColor: '#f7b924',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f7b924',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f7b924',
    },
  ];

  public lineChartColors2: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(48, 177, 255, 0.2)',
      borderColor: '#30b1ff',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#30b1ff',
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#30b1ff',
    },
  ];

  public lineChartColors3: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(86, 196, 121, 0.2)',
      borderColor: '#56c479',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#56c479',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#56c479',
    },
  ];

  public labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };

  totalLicenca: number;
  totalVencidas: number;
  totalProtocolar: number;
  totalProtocoladas: number;
  licencaVencidas: LicencaAmbiental;
  licencaEntidade: LicencaEntidade;

  constructor(private licencaEntidadeService: LicencaEntidadeService) { }

  ngOnInit() {
    this.setTotais();
    console.log('window.location.host' + window.location.host);
  }

  public setTotais() {
    this.licencaEntidadeService.getTotalValidas().subscribe(total => {
      this.totalLicenca = total[0].total;
    });

    this.licencaEntidadeService.getTotalSituacao('VENCIDA').subscribe(total => {
      this.totalVencidas = total[0].total;
    });

    this.licencaEntidadeService.getTotalSituacao('PROTOCOLAR').subscribe(total => {
      this.totalProtocolar = total[0].total;
    });

    this.licencaEntidadeService.getTotalSituacao('PROTOCOLADA').subscribe(total => {
      this.totalProtocoladas = total[0].total;
    });

    this.licencaEntidadeService.getVencidas().subscribe(vencidas => {
      this.licencaVencidas = vencidas;
    });

    this.licencaEntidadeService.getAll().subscribe(licencas => {
      this.licencaEntidade = licencas;
    });
  }

  public acao(licenca) {
    this.licencaEntidadeService.acao(licenca);
  }

  public getProximaAcao(licenca): string {
    return this.licencaEntidadeService.getProximaAcao(licenca);
  }

}
