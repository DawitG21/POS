import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { AppVariablesService } from '../../service/app-variables.service';
import 'lity';

@Component({
  selector: 'widgets',
  templateUrl: './widgets.html',
  styleUrls: [ './widgets.css' ],
  encapsulation: ViewEncapsulation.None
})

export class WidgetsPage {
	appVariables = this.appVariablesService.getAppVariables();
	
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;
	code6: any;
	code7: any;
	code8: any;
	code9: any;
	code10: any;
	code11: any;
	
	public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartOptions<'bar'> = { };
  public barChartLegend = true;

	constructor(private http: HttpClient, private appVariablesService: AppVariablesService) { 
    this.appVariablesService.variablesReload.subscribe(() => {
      this.appVariables = this.appVariablesService.getAppVariables();
      this.setChartOptions();
      this.renderBarChart();
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
	
	ngOnInit() {
    this.setChartOptions();
    this.renderBarChart();
    
    this.http.get('assets/data/widgets/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/widgets/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/widgets/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/widgets/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/widgets/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
    this.http.get('assets/data/widgets/code-6.json', { responseType: 'text' }).subscribe(data => {
    	this.code6 = data;
		});
    this.http.get('assets/data/widgets/code-7.json', { responseType: 'text' }).subscribe(data => {
    	this.code7 = data;
		});
    this.http.get('assets/data/widgets/code-8.json', { responseType: 'text' }).subscribe(data => {
    	this.code8 = data;
		});
    this.http.get('assets/data/widgets/code-9.json', { responseType: 'text' }).subscribe(data => {
    	this.code9 = data;
		});
    this.http.get('assets/data/widgets/code-10.json', { responseType: 'text' }).subscribe(data => {
    	this.code10 = data;
		});
    this.http.get('assets/data/widgets/code-11.json', { responseType: 'text' }).subscribe(data => {
    	this.code11 = data;
		});
  }
}
