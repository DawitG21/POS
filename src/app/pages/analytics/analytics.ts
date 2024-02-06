import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { AppVariablesService } from '../../service/app-variables.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.html'
})

export class AnalyticsPage {
	finishLoad: boolean = false;
	appVariables = this.appVariablesService.getAppVariables();
	prevDate = moment().add(-1, 'd').format('D MMM YYYY');
	todayDate = moment().format('D MMM YYYY');
  
  public chart1Data: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chart1Options: ChartOptions<'line'> = { };
  public chart1Legend = true;
  
  public chart2Data: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chart2Options: ChartOptions<'line'> = { };
  public chart2Legend = true;
  
  public chart3Data: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chart3Options: ChartOptions<'line'> = { };
  public chart3Legend = true;
  
  public chart4Data: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chart4Options: ChartOptions<'line'> = { };
  public chart4Legend = true;
  
  public chart5Data: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chart5Options: ChartOptions<'line'> = { };
  public chart5Legend = true;
  
	constructor(private appVariablesService: AppVariablesService) {
    this.appVariablesService.variablesReload.subscribe(() => {
      this.appVariables = this.appVariablesService.getAppVariables();
      this.setChartOptions();
      this.renderChart1();
      this.renderChart2();
      this.renderChart3();
      this.renderChart4();
      this.renderChart5();
    });
  }
  
  ngOnInit() {
  	this.setChartOptions();
		this.renderChart1();
		this.renderChart2();
		this.renderChart3();
		this.renderChart4();
		this.renderChart5();
		
		this.finishLoad = true;
  }
  
  setChartOptions() {
    Chart.defaults.font.family = this.appVariables.font.bodyFontFamily;
    Chart.defaults.font.size = 12;
    Chart.defaults.color = this.appVariables.color.bodyColor;
    Chart.defaults.borderColor = this.appVariables.color.borderColor;
    Chart.defaults.plugins.tooltip.padding = { left: 8, right: 12, top: 8, bottom: 8 };
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.titleMarginBottom = 6;
    Chart.defaults.plugins.tooltip.displayColors = true;
    Chart.defaults.plugins.tooltip.boxPadding = 6;
  }
  
  
	newDate(days: any) {
		return moment().add(days, 'd').format('D MMM');
	}

	newDateString(days: any) {
		return moment().add(days, 'd').format();
	}
  
  renderChart1() {
  	this.chart1Data = {
			labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.newDate(1)],
			datasets: [{
				pointBorderColor: this.appVariables.color.theme,
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.theme,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.theme,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 0, 601, 220]
			},{
				pointBorderColor: this.appVariables.color.secondary,
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.secondary,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.secondary,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 0, 500, 120, 0, 0, 0]
			}]
		};
		this.chart1Options = {
      color: this.appVariables.color.bodyColor,
      scales: { }
    };
	}
	
  renderChart2() {
		this.chart2Data = {
			labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.newDate(1)],
			datasets: [{
				pointBorderColor: this.appVariables.color.theme,
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.theme,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.theme,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 20, 50, 100, 120]
			},{
				pointBorderColor: this.appVariables.color.secondary,
				backgroundColor: this.appVariables.color.secondary,
				borderColor: this.appVariables.color.secondary,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.secondary,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 30, 44, 130, 34, 15, 43, 22]
			}]
		};
		this.chart2Options = {
      color: this.appVariables.color.bodyColor,
      scales: { }
    };
	}
	
  renderChart3() {
		this.chart3Data = {
			labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.newDate(1)],
			datasets: [{
				pointBorderColor: this.appVariables.color.indigo,
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.indigo,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.indigo,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 5, 18, 9]
			},{
				pointBorderColor: this.appVariables.color.theme,
				backgroundColor: this.appVariables.color.theme,
				borderColor: this.appVariables.color.theme,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.theme,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 10, 26, 13]
			}]
		};
		this.chart3Options = {
      color: this.appVariables.color.bodyColor,
      scales: { }
    };
	}
	
  renderChart4() {
		this.chart4Data = {
			labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.newDate(1)],
			datasets: [{
				pointBorderColor: this.appVariables.color.theme,
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.theme,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.theme,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 0, 24, 39]
			},{
				pointBorderColor: this.appVariables.color.secondary,
				backgroundColor: this.appVariables.color.secondary,
				borderColor: this.appVariables.color.secondary,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.secondary,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 0, 28, 35, 23, 0, 0]
			}]
		};
		this.chart4Options = {
      color: this.appVariables.color.bodyColor,
      scales: { }
    };
	}
	
  renderChart5() {
		this.chart5Data = {
			labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.newDate(1)],
			datasets: [{
				pointBorderColor: this.appVariables.color.theme,
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.theme,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.theme,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 0, 12, 5]
			},{
				pointBorderColor: this.appVariables.color.secondary,
				backgroundColor: this.appVariables.color.secondary,
				borderColor: this.appVariables.color.secondary,
				borderWidth: 2,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverBorderColor: this.appVariables.color.secondary,
				pointHoverRadius: 6,
				pointHoverBorderWidth: 2,
				data: [0, 0, 0, 10, 4, 2, 0, 0]
			}]
		};
		this.chart5Options = {
      color: this.appVariables.color.bodyColor,
      scales: { }
    };
  }
}
