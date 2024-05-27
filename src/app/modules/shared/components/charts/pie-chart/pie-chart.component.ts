import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements OnInit {
    @ViewChild('chart') chart!: ChartComponent;
    @Input() chartInputData?: {series: number[], labels: string[]};
    public chartOptions: Partial<ChartOptions> = {};
    isChartEnabled: boolean = false;

    constructor() {
      
    }

    ngOnInit(): void {
      console.log(this.chartInputData);

      // Render chart data.
      this.renderPieChart();
    }


    /*
      Render Pie Chart data.
    */
    renderPieChart(): void {
      this.chartOptions = {
        series: this.chartInputData?.series,
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: this.chartInputData?.labels,
        colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0'],
        responsive: [{
        breakpoint: 480,
        options: {
            chart: {
            width: 200
            },
            legend: {
            position: 'bottom'
            }
        }
        }]
      };

      this.isChartEnabled = true;
    } 
}