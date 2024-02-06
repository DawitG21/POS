import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { AppVariablesService } from '../../../service/app-variables.service';

@Component({
  selector: 'chart-js',
  templateUrl: './chart-js.html'
})

export class ChartJsPage {
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;
	code6: any;
  appVariables = this.appVariablesService.getAppVariables();
	
	public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'> = { };
  public lineChartLegend = true;
  
	public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartOptions<'bar'> = { };
  public barChartLegend = true;
  
	public radarChartData: ChartConfiguration<'radar'>['data'] = { labels: [], datasets: [] };
  public radarChartOptions: ChartOptions<'radar'> = { };
  public radarChartLegend = true;
  
	public polarAreaChartData: ChartConfiguration<'polarArea'>['data'] = { labels: [], datasets: [] };
  public polarAreaChartOptions: ChartOptions<'polarArea'> = { };
  public polarAreaChartLegend = true;
  
	public pieChartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  public pieChartOptions: ChartOptions<'pie'> = { };
  public pieChartLegend = true;
  
	public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  public doughnutChartOptions: ChartOptions<'doughnut'> = { };
  public doughnutChartLegend = true;
  
	constructor(private http: HttpClient, private appVariablesService: AppVariablesService) {
		this.appVariablesService.variablesReload.subscribe(() => {
			this.appVariables = this.appVariablesService.getAppVariables();
			this.setChartOptions();
			this.renderLineChart();
			this.renderBarChart();
			this.renderRadarChart();
			this.renderPolarAreaChart();
			this.renderPieChart();
			this.renderDoughnutChart();
		});
	}
	
	setChartOptions() {
		Chart.defaults.font.family = this.appVariables.font.bodyFontFamily;
		Chart.defaults.font.size = 12;
		Chart.defaults.color = this.appVariables.color.bodyColor;
		Chart.defaults.borderColor = this.appVariables.color.borderColor;
		Chart.defaults.plugins.legend.display = false;
		Chart.defaults.plugins.tooltip.padding = { left: 8, right: 12, top: 8, bottom: 8 };
		Chart.defaults.plugins.tooltip.cornerRadius = 8;
		Chart.defaults.plugins.tooltip.titleMarginBottom = 6;
		Chart.defaults.plugins.tooltip.displayColors = true;
		Chart.defaults.plugins.tooltip.boxPadding = 6;
	}
	
	renderLineChart() {
		this.lineChartData = {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [{
				backgroundColor: 'transparent',
				borderColor: this.appVariables.color.theme,
				borderWidth: 1.5,
				pointBorderColor: this.appVariables.color.theme,
				pointBackgroundColor: this.appVariables.color.bodyBg,
				pointBorderWidth: 1.5,
				pointRadius: 4,
				pointHoverBorderColor: this.appVariables.color.theme,
				pointHoverBackgroundColor: this.appVariables.color.bodyBg,
				pointHoverRadius: 7,
				label: 'Total Sales',
				data: [12, 19, 4, 5, 2, 3]
			}]
		};
		this.lineChartOptions = {
			color: this.appVariables.color.bodyColor,
			scales: { }
		};
	}
	
	renderBarChart() {
		this.barChartData = {
			labels: ['Jan','Feb','Mar','Apr','May','Jun'],
			datasets: [{
				label: 'Total Visitors',
				data: [37,31,36,34,43,31],
				backgroundColor: 'rgba('+ this.appVariables.color.themeRgb +', .25)',
				borderColor: this.appVariables.color.theme,
				borderWidth: 1.5
			},{
				label: 'New Visitors',
				data: [12,16,20,14,23,21],
				backgroundColor: 'rgba('+ this.appVariables.color.secondaryRgb +', .25)',
				borderColor: this.appVariables.color.secondary,
				borderWidth: 1.5
			}]
		};
		this.barChartOptions = {
			color: this.appVariables.color.bodyColor,
			scales: { }
		}
	}
	
	renderRadarChart() {
		this.radarChartData = {
			labels: ['United States', 'Canada', 'Australia', 'Netherlands', 'Germany', 'New Zealand', 'Singapore'],
			datasets: [{
				label: 'Mobile',
				backgroundColor: 'rgba('+ this.appVariables.color.themeRgb +', .25)',
				borderColor: this.appVariables.color.theme,
				pointBackgroundColor: this.appVariables.color.theme,
				pointBorderColor: this.appVariables.color.theme,
				pointHoverBackgroundColor: this.appVariables.color.theme,
				pointHoverBorderColor: this.appVariables.color.theme,
				data: [65, 59, 90, 81, 56, 55, 40],
				borderWidth: 1.5
			}, {
				label: 'Desktop',
				backgroundColor: 'rgba('+ this.appVariables.color.secondaryRgb +', .25)',
				borderColor: this.appVariables.color.secondary,
				pointBackgroundColor: this.appVariables.color.secondary,
				pointBorderColor: this.appVariables.color.secondary,
				pointHoverBackgroundColor: this.appVariables.color.secondary,
				pointHoverBorderColor: this.appVariables.color.secondary,
				data: [28, 48, 40, 19, 96, 27, 100],
				borderWidth: 1.5
			}]
		};
		this.radarChartOptions = {
			color: this.appVariables.color.bodyColor,
			scales: { }
		}
	}
	
	renderPolarAreaChart() {
		this.polarAreaChartData = {
			labels: ['IE', 'Safari', 'Chrome', 'Firefox', 'Opera'],
			datasets: [{
				data: [11, 16, 7, 3, 14],
				backgroundColor: ['rgba('+ this.appVariables.color.themeRgb +', .5)', 'rgba('+ this.appVariables.color.secondaryRgb +', .5)', 'rgba('+ this.appVariables.color.themeRgb +', .25)', 'rgba('+ this.appVariables.color.themeRgb +', .75)', 'rgba('+ this.appVariables.color.secondaryRgb +', .75)'],
				borderWidth: 0
			}]
		};
		this.polarAreaChartOptions = {
			color: this.appVariables.color.bodyColor,
			scales: { }
		}
	}
	
	renderPieChart() {
		this.pieChartData = {
			labels: ['Total Visitor', 'New Visitor', 'Returning Visitor'],
			datasets: [{
				data: [300, 50, 100],
				backgroundColor: ['rgba('+ this.appVariables.color.themeRgb +', .75)', 'rgba('+ this.appVariables.color.warningRgb +', .75)', 'rgba('+ this.appVariables.color.successRgb +', .75)'],
				hoverBackgroundColor: ['rgba('+ this.appVariables.color.themeRgb +', .5)', 'rgba('+ this.appVariables.color.warningRgb +', .5)', 'rgba('+ this.appVariables.color.successRgb +', .5)'],
				borderWidth: 0
			}]
		};
		this.pieChartOptions = {
			color: this.appVariables.color.bodyColor,
			scales: { }
		}
	}
	
	renderDoughnutChart() {
		this.doughnutChartData = {
			labels: ['Total Visitor', 'New Visitor', 'Returning Visitor'],
			datasets: [{
				data: [300, 50, 100],
				backgroundColor: ['rgba('+ this.appVariables.color.themeRgb +', .75)', 'rgba('+ this.appVariables.color.themeRgb +', .25)', 'rgba('+ this.appVariables.color.themeRgb +', .5)'],
				hoverBackgroundColor: [this.appVariables.color.theme, this.appVariables.color.theme, this.appVariables.color.theme],
				borderWidth: 0
			}]
		};
		this.doughnutChartOptions = {
			color: this.appVariables.color.bodyColor,
			scales: { }
		}
	}
	
	ngOnInit() {
		this.setChartOptions();
		this.renderLineChart();
		this.renderBarChart();
		this.renderRadarChart();
		this.renderPolarAreaChart();
		this.renderPieChart();
		this.renderDoughnutChart();
    this.http.get('assets/data/chart-js/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/chart-js/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/chart-js/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/chart-js/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/chart-js/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
    this.http.get('assets/data/chart-js/code-6.json', { responseType: 'text' }).subscribe(data => {
    	this.code6 = data;
		});
  }
}
