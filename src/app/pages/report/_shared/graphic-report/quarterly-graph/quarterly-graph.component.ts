import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-quarterly-graph',
  templateUrl: './quarterly-graph.component.html',
  styleUrls: ['./quarterly-graph.component.scss'],
})
export class QuarterlyGraphComponent implements OnInit {

  @Input() legendy: string | null = 'Eje Y';


  constructor() {}
  /**
   * Data
   */
  public lineChartData: ChartDataSets[] = [
    {
      data: [
        {
          x: 0,
          y: 3,
        },
        {
          x: 0,
          y: 6,
        },
        {
          x: 0,
          y: 10,
        }
      ],
      label: '2017-2018',

      fill: true,
      borderWidth: 2,
    },
    {
      data: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 2,
          y: 2,
        },
        {
          x: 3,
          y: 3,
        }
      ],
      label: '2017-2018',

      fill: true,
      borderWidth: 2,
    },
  ];

  /**
   * Labels
   */
  public lineChartLabels: Label[] = [
    ['Enero', 'Febrero', 'Marzo'],
    ['Abril', 'Mayo', 'Junio'],
    ['Julio', 'Agosto', 'Septiembre'],
    ['Octubre', 'Noviembre', 'Diciembre'],
  ];

  /**
   * General options
   */

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    title: {
      display: true,
      text: 'Reporte de padrinos activos',
    },
    tooltips: {
      mode: 'point',
    },
    elements: {
      line: {
        tension: 1,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Numero de padrinos inactivos',
            fontStyle: 'bold',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            drawTicks: false,
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',
          },
        },
      ],
    },
  };

  /**
   * Styles charts
   */
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(142, 189, 62)',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'rgb(44, 129, 154)',
      backgroundColor: 'transparent',
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';


  dataGraph = [

    // -- period
    {
      academicPeriod: [
        '2016',
        '2017'
      ],

      // -- School numbers
      coordinates: [
        {
          x: 0, // <-- Trimestre:  4 puntos
          y: 0, // <-- El number de escuelas
        },
      ],
    },

    // -- period
    {
      academicPeriod: [
        '2016',
        '2017'
      ],
    },
  ];

  ngOnInit() {}

}
