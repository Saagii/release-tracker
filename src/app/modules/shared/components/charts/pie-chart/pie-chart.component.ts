import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements OnInit {
    @ViewChild('chart') chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    isChartEnabled: boolean = false;
    constructor() {
    this.chartOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
        width: 380,
        type: 'pie'
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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

    ngOnInit(): void {
    }
}