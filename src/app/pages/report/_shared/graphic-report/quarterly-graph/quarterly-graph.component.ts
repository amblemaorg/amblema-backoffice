import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ChartAverage } from '../../_model/average-graph.model';

@Component({
  selector: 'app-quarterly-graph',
  templateUrl: './quarterly-graph.component.html',
  styleUrls: ['./quarterly-graph.component.scss'],

})
export class QuarterlyGraphComponent implements OnInit {
  @Input() legendy: string | null = 'Eje Y';
  @Input() title: string | null = 'Gráfico';
  @Input() data: ChartAverage[];

  constructor() {}
  /**
   * Data
   */
  public lineChartData: ChartDataSets[] = [];

  /**
   * Labels
   */
  public lineChartLabels: Label[] = [
    ['Septiembre', 'Octubre', 'Noviembre'],
    ['Diciembre', 'Enero', 'Febrero'],
    ['Marzo', 'Abril', 'Mayo'],
    ['Junio', 'Julio', 'Agosto']
  ];

  /**
   * General options
   */

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    title: {
      display: true,
      fontSize: 20,
      fontColor: 'rgb(44, 129, 154)',
      padding: 30
    },
    tooltips: {
      mode: 'nearest',
    },
    elements: {
      line: {
        tension: 0.000,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: this.legendy,
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

  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  async ngOnInit() {


    /**
     * Set legends and title
     */
    this.lineChartOptions.scales.yAxes[0].scaleLabel.labelString = this.legendy;
    this.lineChartOptions.title.text = this.title;

    // -- Set data --

    this.data.forEach( (value, key) => {

      // -- Random color --
      const color: any = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

      this.lineChartData.push({
        data: value.coordinates,
        label: `${value.academicPeriod[0]}-${value.academicPeriod[1]}`,
        fill: false,
        borderWidth: 2,
      });

      this.lineChartColors.push({
        backgroundColor: color,
        borderColor: color
      });

    });
  }
}
