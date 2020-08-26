import { Component, OnInit, Input } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-graphic-bar',
  templateUrl: './graphic-bar.component.html',
  styleUrls: ['./graphic-bar.component.scss'],
})
export class GraphicBarComponent implements OnInit {
  // -- Init data
  @Input() public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: 'red' },
  ];

  // -- Label X
  @Input() public barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#2c819a' }
  ];

  // -- General options
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor() {}

  async ngOnInit() {}
}
