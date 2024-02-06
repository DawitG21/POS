import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppVariablesService } from '../../../service/app-variables.service';


@Component({
  selector: 'chart-apex',
  templateUrl: './chart-apex.html'
})

export class ChartApexPage {
	appVariables = this.appVariablesService.getAppVariables();
  
  chart1Options: any;
  chart2Options: any;
  chart3Options: any;
  chart4Options: any;
  chart5Options: any;
  chart6Options: any;
  chart7Options: any;
  chart8Options: any;
  chart9Options: any;
  chart10Options: any;
  chart11Options: any;
  chart12Options: any;
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
	code12: any;

	constructor(private http: HttpClient, private appVariablesService: AppVariablesService) {
		this.appVariablesService.variablesReload.subscribe(() => {
      this.appVariables = this.appVariablesService.getAppVariables();
      this.chart1Options = this.getChart1Options();
      this.chart2Options = this.getChart2Options();
			this.chart3Options = this.getChart3Options();
			this.chart4Options = this.getChart4Options();
			this.chart5Options = this.getChart5Options();
			this.chart6Options = this.getChart6Options();
			this.chart7Options = this.getChart7Options();
			this.chart8Options = this.getChart8Options();
			this.chart9Options = this.getChart9Options();
			this.chart10Options = this.getChart10Options();
			this.chart11Options = this.getChart11Options();
			this.chart12Options = this.getChart12Options();
    });
  }
  
	generateBubbleChartData(baseval: any, count: any, yrange: any) {
		var i = 0;
		var series = [];
		while (i < count) {
			var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
			var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
			var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

			series.push([x, y, z]);
			baseval += 86400000;
			i++;
		}
		return series;
	}
	
	generateHeatmapData(count: any, yrange: any) {
		var i = 0;
		var series = [];
		while (i < count) {
			var x = 'w' + (i + 1).toString();
			var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

			series.push({ x: x, y: y });
			i++;
		}
		return series;
	}
	
  getChart1Options() {
		return {
			series: [
				{ name: 'High - 2021', data: [28, 29, 33, 36, 32, 32, 33] }, 
				{ name: 'Low - 2021', data: [12, 11, 14, 18, 17, 13, 13] }
			],
			chart: {
				type: 'line',
				shadow: {
					enabled: true,
					color: 'rgba('+ this.appVariables.color.inverseRgb + ', .5)',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 1
				},
				toolbar: { show: false }
			},
			title: {
				text: 'Average High & Low Temperature',
				align: 'center',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			colors: [this.appVariables.color.theme, this.appVariables.color.gray500],
			dataLabels: {
				enabled: true,
				style: {
					fontSize: '12px',
					fontFamily: this.appVariables.font.bodyFontFamily,
					fontWeight: '600',
					colors: undefined
				},
				background: {
					enabled: true,
					foreColor: this.appVariables.color.inverse,
					padding: 4,
					borderRadius: 2,
					borderWidth: 0,
					borderColor: this.appVariables.color.inverse,
					opacity: 0.9,
					dropShadow: {
						enabled: false,
						top: 1,
						left: 1,
						blur: 1,
						color: this.appVariables.color.black,
						opacity: 0.45
					}
				},
			},
			stroke: { curve: 'smooth', width: 3 },
			grid: {
				borderColor: this.appVariables.color.borderColor,
				row: {
					colors: [this.appVariables.color.bodyBg, 'transparent'],
					opacity: 0.5
				}
			},
			markers: { size: 4 },
			xaxis: { 
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: { 
				min: 5, 
				max: 40,
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			legend: {
				show: true,
				position: 'top',
				offsetY: -10,
				horizontalAlign: 'right',
				floating: true,
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			}
		};
	}
	getChart2Options() {
		return {
			series: [
				{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }, 
				{ name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] }, 
				{ name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] }
			],
			title: {
				text: 'Profit & Margin Chart',
				align: 'center',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			chart: {
				height: 350,
				type: 'bar'
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					endingShape: 'rounded'	
				},
			},
			legend: {
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			},
			tooltip: {
				style: {
					fontSize: '12px',
					fontFamily: this.appVariables.font.bodyFontFamily
				}
			},
			grid: { borderColor: this.appVariables.color.borderColor },
			dataLabels: { enabled: false },
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			colors: [this.appVariables.color.theme, this.appVariables.color.indigo, this.appVariables.color.inverse],
			xaxis: {
				categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: {
				title: {
					text: '$ (thousands)',
					style: {
						color: 'rgba('+ this.appVariables.color.bodyColorRgb + ', .5)',
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight
					}
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			fill: { opacity: 1 }
		};
	}
	getChart3Options() {
		return {
			chart: {
				height: 350,
				type: 'area',
			},
			dataLabels: { enabled: false },
			stroke: { curve: 'smooth', width: 3 },
			colors: [this.appVariables.color.teal, this.appVariables.color.inverse],
			series: [
				{ name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] }, 
				{ name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] }
			],
			legend: {
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			},
			grid: { borderColor: this.appVariables.color.borderColor },
			xaxis: {
				type: 'datetime',
				categories: ['2019-09-19T00:00:00', '2019-09-19T01:30:00', '2019-09-19T02:30:00', '2019-09-19T03:30:00', '2019-09-19T04:30:00', '2019-09-19T05:30:00', '2019-09-19T06:30:00'],
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}           
			},
			yaxis: {
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
		};
	}
	getChart4Options() {
		return {
			chart: {
				height: 350,
				type: 'bar',
			},
			plotOptions: {
				bar: {
					horizontal: true,
					dataLabels: { position: 'top' }
				}  
			},
			dataLabels: {
				enabled: true,
				offsetX: -6,
				style: {
					fontSize: '12px',
					colors: [this.appVariables.color.white]
				}
			},
			colors: [this.appVariables.color.warning, this.appVariables.color.gray500],
			stroke: { show: false },
			legend: {
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			},
			series: [
				{ data: [44, 55, 41, 64, 22, 43, 21] },
				{ data: [53, 32, 33, 52, 13, 44, 32] }
			],
			xaxis: {
				categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			grid: { borderColor: this.appVariables.color.borderColor }
		};
	}
	getChart5Options() {
		return {
			chart: {
				height: 350,
				type: 'line',
				stacked: false
			},
			series: [
				{ name: 'Income', type: 'column', data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6] },
				{ name: 'Cashflow', type: 'column', data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5] }, 
				{ name: 'Revenue', type: 'line', data: [20, 29, 37, 36, 44, 45, 50, 58] }
			],
			dataLabels: { enabled: false },
			stroke: { width: [0, 0, 3] },
			colors: [this.appVariables.color.theme, 'rgba('+ this.appVariables.color.bodyColorRgb + ', .5)', this.appVariables.color.warning],
			title: {
				text: 'XYZ - Stock Analysis (2012 - 2021)',
				align: 'left',
				offsetX: 110,
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			xaxis: {
				categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2021],
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: [{
				axisTicks: { show: true, color: this.appVariables.color.borderColor },
				axisBorder: { show: true, color: this.appVariables.color.theme },
				labels: { style: { colors: [this.appVariables.color.bodyColor] } },
				title: {
					text: "Income (thousand crores)",
					style: { color: this.appVariables.color.theme }
				},
				tooltip: { enabled: true }
			},{
				seriesName: 'Income',
				opposite: true,
				axisTicks: { show: true, color: this.appVariables.color.borderColor },
				axisBorder: { show: true, color: this.appVariables.color.borderColor },
				labels: { style: { colors: [this.appVariables.color.bodyColor] } },
				title: {
					text: "Operating Cashflow (thousand crores)",
					style: { color: this.appVariables.color.bodyColor }
				},
			}, {
				seriesName: 'Revenue',
				opposite: true,
				axisTicks: { show: true, color: this.appVariables.color.borderColor },
				axisBorder: { show: true, color: this.appVariables.color.warning },
				labels: { style: { colors: [this.appVariables.color.bodyColor] } },
				title: {
					text: "Revenue (thousand crores)",
					style: { color: this.appVariables.color.warning }
				}
			}],
			grid: { borderColor: this.appVariables.color.borderColor },
			legend: { 
				horizontalAlign: 'left', 
				offsetX: 40,
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			},
			tooltip: {
				fixed: {
					enabled: true,
					position: 'topLeft',
					offsetY: 30,
					offsetX: 60
				},
			}
		};
	}
	getChart6Options() {
		return {
			chart: {
				height: 350,
				type: 'candlestick'
			},
			series: [{
				data: [
					{ x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
					{ x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
					{ x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
					{ x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
					{ x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
					{ x: new Date(1538787600000), y: [6624.53, 6636.03, 6621.68, 6624.31] },
					{ x: new Date(1538789400000), y: [6624.61, 6632.2, 6617, 6626.02] },
					{ x: new Date(1538791200000), y: [6627, 6627.62, 6584.22, 6603.02] },
					{ x: new Date(1538793000000), y: [6605, 6608.03, 6598.95, 6604.01] },
					{ x: new Date(1538794800000), y: [6604.5, 6614.4, 6602.26, 6608.02] },
					{ x: new Date(1538796600000), y: [6608.02, 6610.68, 6601.99, 6608.91] },
					{ x: new Date(1538798400000), y: [6608.91, 6618.99, 6608.01, 6612] },
					{ x: new Date(1538800200000), y: [6612, 6615.13, 6605.09, 6612] },
					{ x: new Date(1538802000000), y: [6612, 6624.12, 6608.43, 6622.95] },
					{ x: new Date(1538803800000), y: [6623.91, 6623.91, 6615, 6615.67] },
					{ x: new Date(1538805600000), y: [6618.69, 6618.74, 6610, 6610.4] },
					{ x: new Date(1538807400000), y: [6611, 6622.78, 6610.4, 6614.9] },
					{ x: new Date(1538809200000), y: [6614.9, 6626.2, 6613.33, 6623.45] },
					{ x: new Date(1538811000000), y: [6623.48, 6627, 6618.38, 6620.35] },
					{ x: new Date(1538812800000), y: [6619.43, 6620.35, 6610.05, 6615.53] },
					{ x: new Date(1538814600000), y: [6615.53, 6617.93, 6610, 6615.19] },
					{ x: new Date(1538816400000), y: [6615.19, 6621.6, 6608.2, 6620] },
					{ x: new Date(1538818200000), y: [6619.54, 6625.17, 6614.15, 6620] },
					{ x: new Date(1538820000000), y: [6620.33, 6634.15, 6617.24, 6624.61] },
					{ x: new Date(1538821800000), y: [6625.95, 6626, 6611.66, 6617.58] },
					{ x: new Date(1538823600000), y: [6619, 6625.97, 6595.27, 6598.86] },
					{ x: new Date(1538825400000), y: [6598.86, 6598.88, 6570, 6587.16] },
					{ x: new Date(1538827200000), y: [6588.86, 6600, 6580, 6593.4] },
					{ x: new Date(1538829000000), y: [6593.99, 6598.89, 6585, 6587.81] },
					{ x: new Date(1538830800000), y: [6587.81, 6592.73, 6567.14, 6578] },
					{ x: new Date(1538832600000), y: [6578.35, 6581.72, 6567.39, 6579] },
					{ x: new Date(1538834400000), y: [6579.38, 6580.92, 6566.77, 6575.96] },
					{ x: new Date(1538836200000), y: [6575.96, 6589, 6571.77, 6588.92] },
					{ x: new Date(1538838000000), y: [6588.92, 6594, 6577.55, 6589.22] },
					{ x: new Date(1538839800000), y: [6589.3, 6598.89, 6589.1, 6596.08] },
					{ x: new Date(1538841600000), y: [6597.5, 6600, 6588.39, 6596.25] },
					{ x: new Date(1538843400000), y: [6598.03, 6600, 6588.73, 6595.97] },
					{ x: new Date(1538845200000), y: [6595.97, 6602.01, 6588.17, 6602] },
					{ x: new Date(1538847000000), y: [6602, 6607, 6596.51, 6599.95] },
					{ x: new Date(1538848800000), y: [6600.63, 6601.21, 6590.39, 6591.02] },
					{ x: new Date(1538850600000), y: [6591.02, 6603.08, 6591, 6591] },
					{ x: new Date(1538852400000), y: [6591, 6601.32, 6585, 6592] },
					{ x: new Date(1538854200000), y: [6593.13, 6596.01, 6590, 6593.34] },
					{ x: new Date(1538856000000), y: [6593.34, 6604.76, 6582.63, 6593.86] },
					{ x: new Date(1538857800000), y: [6593.86, 6604.28, 6586.57, 6600.01] },
					{ x: new Date(1538859600000), y: [6601.81, 6603.21, 6592.78, 6596.25] },
					{ x: new Date(1538861400000), y: [6596.25, 6604.2, 6590, 6602.99] },
					{ x: new Date(1538863200000), y: [6602.99, 6606, 6584.99, 6587.81] },
					{ x: new Date(1538865000000), y: [6587.81, 6595, 6583.27, 6591.96] },
					{ x: new Date(1538866800000), y: [6591.97, 6596.07, 6585, 6588.39] },
					{ x: new Date(1538868600000), y: [6587.6, 6598.21, 6587.6, 6594.27] },
					{ x: new Date(1538870400000), y: [6596.44, 6601, 6590, 6596.55] },
					{ x: new Date(1538872200000), y: [6598.91, 6605, 6596.61, 6600.02] },
					{ x: new Date(1538874000000), y: [6600.55, 6605, 6589.14, 6593.01] },
					{ x: new Date(1538875800000), y: [6593.15, 6605, 6592, 6603.06] },
					{ x: new Date(1538877600000), y: [6603.07, 6604.5, 6599.09, 6603.89] },
					{ x: new Date(1538879400000), y: [6604.44, 6604.44, 6600, 6603.5] },
					{ x: new Date(1538881200000), y: [6603.5, 6603.99, 6597.5, 6603.86] },
					{ x: new Date(1538883000000), y: [6603.85, 6605, 6600, 6604.07] },
					{ x: new Date(1538884800000), y: [6604.98, 6606, 6604.07, 6606] }
				]
			}],
			title: {
				text: 'CandleStick Chart',
				align: 'left',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			xaxis: {
				type: 'datetime',
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: { 
				tooltip: { enabled: true },
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			plotOptions: {
				candlestick: {
					colors: {
						upward: this.appVariables.color.success,
						downward: this.appVariables.color.danger
					},
					wick: { useFillColor: true }
				}
			},
			grid: { borderColor: this.appVariables.color.borderColor },
		};
	}
	getChart7Options() {
		return {
			series: [
				{ name: 'Bubble1', data: this.generateBubbleChartData(new Date('11 Feb 2023 GMT').getTime(), 20, { min: 10, max: 60 }) },
				{ name: 'Bubble2', data: this.generateBubbleChartData(new Date('11 Feb 2023 GMT').getTime(), 20, { min: 10, max: 60 }) },
				{ name: 'Bubble3', data: this.generateBubbleChartData(new Date('11 Feb 2023 GMT').getTime(), 20, { min: 10, max: 60 }) },
				{ name: 'Bubble4', data: this.generateBubbleChartData(new Date('11 Feb 2023 GMT').getTime(), 20, { min: 10, max: 60 }) }
			],
			chart: {
				height: 350,
				type: 'bubble',
			},
			title: { 
				text: 'Simple Bubble Chart',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			xaxis: { 
				tickAmount: 12, 
				type: 'category',
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: { 
				max: 70,
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			grid: { borderColor: this.appVariables.color.borderColor },
			dataLabels: { enabled: false },
			colors: [this.appVariables.color.theme, this.appVariables.color.teal, 'rgba('+ this.appVariables.color.bodyColorRgb + ', .5)', this.appVariables.color.pink],
			fill: { opacity: 0.8 },
			legend: {
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			}
		};
	}
	getChart8Options() {
		return {
			chart: {
				height: 350,
				type: 'scatter',
				zoom: { enabled: true, type: 'xy' }
			},
			colors: [this.appVariables.color.theme, this.appVariables.color.warning, 'rgba('+ this.appVariables.color.bodyColorRgb + ', .5)'],
			series: [
				{ name: 'SAMPLE A', data: [[16.4, 5.4],[21.7, 2],[25.4, 3],[19, 2],[10.9, 1],[13.6, 3.2],[10.9, 7.4],[10.9, 0],[10.9, 8.2],[16.4, 0],[16.4, 1.8],[13.6, 0.3],[13.6, 0],[29.9, 0],[27.1, 2.3],[16.4, 0],[13.6, 3.7],[10.9, 5.2],[16.4, 6.5],[10.9, 0],[24.5, 7.1],[10.9, 0],[8.1, 4.7],[19, 0],[21.7, 1.8],[27.1, 0],[24.5, 0],[27.1, 0],[29.9, 1.5],[27.1, 0.8],[22.1, 2]] }, 
				{ name: 'SAMPLE B', data: [[36.4, 13.4],[1.7, 11],[5.4, 8],[9, 17],[1.9, 4],[3.6, 12.2],[1.9, 14.4],[1.9, 9],[1.9, 13.2],[1.4, 7],[6.4, 8.8],[3.6, 4.3],[1.6, 10],[9.9, 2],[7.1, 15],[1.4, 0],[3.6, 13.7],[1.9, 15.2],[6.4, 16.5],[0.9, 10],[4.5, 17.1],[10.9, 10],[0.1, 14.7],[9, 10],[12.7, 11.8],[2.1, 10],[2.5, 10],[27.1, 10],[2.9, 11.5],[7.1, 10.8],[2.1, 12]] }, 
				{ name: 'SAMPLE C', data: [[21.7, 3],[23.6, 3.5],[24.6, 3],[29.9, 3],[21.7, 20],[23, 2],[10.9, 3],[28, 4],[27.1, 0.3],[16.4, 4],[13.6, 0],[19, 5],[22.4, 3],[24.5, 3],[32.6, 3],[27.1, 4],[29.6, 6],[31.6, 8],[21.6, 5],[20.9, 4],[22.4, 0],[32.6, 10.3],[29.7, 20.8],[24.5, 0.8],[21.4, 0],[21.7, 6.9],[28.6, 7.7],[15.4, 0],[18.1, 0],[33.4, 0],[16.4, 0]] }
			],
			xaxis: {
				tickAmount: 10,
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: { 
				tickAmount: 7,
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			grid: { borderColor: this.appVariables.color.borderColor },
			legend: {
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			}
		};
	}
	getChart9Options() {
		return {
			chart: {
				height: 350,
				type: 'heatmap',
			},
			dataLabels: { enabled: false },
			colors: [this.appVariables.color.theme],
			series: [
				{ name: 'Metric1', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric2', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric3', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric4', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric5', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric6', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) },
				{ name: 'Metric7', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric8', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }, 
				{ name: 'Metric9', data: this.generateHeatmapData(18, {	min: 0, max: 90 }) }
			],
			title: { 
				text: 'HeatMap Chart (Single color)',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			xaxis: {
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			}
		};
	}
	getChart10Options() {
		return {
			chart: {
				height: 365,
				type: 'pie',
			},
			dataLabels: {
				dropShadow: {
					enabled: false,
					top: 1,
					left: 1,
					blur: 1,
					opacity: 1
				}
			},
			stroke: { show: false },
			colors: [ 'rgba('+ this.appVariables.color.pinkRgb +', .75)',  'rgba('+ this.appVariables.color.warningRgb +', .75)',  'rgba('+this.appVariables.color.themeRgb +', .75)', 'rgba('+ this.appVariables.color.bodyColorRgb + ', .5)',  'rgba('+this.appVariables.color.indigoRgb +', .75)'],
			labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
			series: [44, 55, 13, 43, 22],
			title: { 
				text: 'HeatMap Chart (Single color)',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			xaxis: {
				axisBorder: {
					show: true,
					color: this.appVariables.color.borderColor,
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: this.appVariables.color.borderColor,
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			legend: {
				fontFamily: this.appVariables.font.bodyFontFamily,
				labels: { colors: this.appVariables.color.bodyColor }
			}
		};
	}
	getChart11Options() {
		return {
			chart: {
				height: 350,
				type: 'radialBar'
			},
			plotOptions: {
				radialBar: {
					offsetY: 0,
					startAngle: 0,
					endAngle: 270,
					hollow: {
						margin: 5,
						size: '30%',
						background: 'transparent',
						image: undefined,
					},
					track: { background: this.appVariables.color.borderColor },
					dataLabels: {
						name: { show: false },
						value: { show: false }
					}
				}
			},
			colors: [this.appVariables.color.cyan, this.appVariables.color.theme, this.appVariables.color.indigo, this.appVariables.color.gray300],
			series: [76, 67, 61, 90],
			labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
			legend: {
				show: true,
				floating: true,
				position: 'left',
				labels: { 
					useSeriesColors: true,
					colors: this.appVariables.color.bodyColor
				},
				markers: { size: 0 },
				itemMargin: { horizontal: 1 },
				fontFamily: this.appVariables.font.bodyFontFamily
			}
		};
	}
	getChart12Options() {
		return {
			chart: {
				height: 320,
				type: 'radar',
			},
			series: [
				{ name: 'Series 1', data: [20, 100, 40, 30, 50, 80, 33] }
			],
			labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			plotOptions: {
				radar: {
					size: 140,
					polygons: {
						strokeColors: this.appVariables.color.borderColor,
						strokeWidth: 1,
						connectorColors: this.appVariables.color.borderColor,
						fill: {
							colors: ['rgba('+this.appVariables.color.bodyColorRgb +', .05)', 'rgba('+ this.appVariables.color.bodyColorRgb + ', .05)']
						}
					}
				}
			},
			title: { 
				text: 'Radar with Polygon Fill',
				style: {
					fontSize: '14px',
					fontWeight: '600',
					fontFamily: this.appVariables.font.bodyFontFamily,
					color: this.appVariables.color.bodyColor
				}
			},
			colors: [this.appVariables.color.theme],
			markers: {
				size: 4,
				colors: [this.appVariables.color.theme],
				strokeColor: this.appVariables.color.theme,
				strokeWidth: 2,
			},
			yaxis: {
				tickAmount: 7,
				labels: {
					style: {
						colors: this.appVariables.color.bodyColor,
						fontSize: '12px',
						fontFamily: this.appVariables.font.bodyFontFamily,
						fontWeight: this.appVariables.font.bodyFontWeight,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			grid: { borderColor: this.appVariables.color.borderColor }
		};
	}
	
	ngOnInit() {
    this.http.get('assets/data/chart-apex/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/chart-apex/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/chart-apex/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/chart-apex/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/chart-apex/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
    this.http.get('assets/data/chart-apex/code-6.json', { responseType: 'text' }).subscribe(data => {
    	this.code6 = data;
		});
    this.http.get('assets/data/chart-apex/code-7.json', { responseType: 'text' }).subscribe(data => {
    	this.code7 = data;
		});
    this.http.get('assets/data/chart-apex/code-8.json', { responseType: 'text' }).subscribe(data => {
    	this.code8 = data;
		});
    this.http.get('assets/data/chart-apex/code-9.json', { responseType: 'text' }).subscribe(data => {
    	this.code9 = data;
		});
    this.http.get('assets/data/chart-apex/code-10.json', { responseType: 'text' }).subscribe(data => {
    	this.code10 = data;
		});
    this.http.get('assets/data/chart-apex/code-11.json', { responseType: 'text' }).subscribe(data => {
    	this.code11 = data;
		});
    this.http.get('assets/data/chart-apex/code-12.json', { responseType: 'text' }).subscribe(data => {
    	this.code12 = data;
		});
		this.chart1Options = this.getChart1Options();
		this.chart2Options = this.getChart2Options();
		this.chart3Options = this.getChart3Options();
		this.chart4Options = this.getChart4Options();
		this.chart5Options = this.getChart5Options();
		this.chart6Options = this.getChart6Options();
		this.chart7Options = this.getChart7Options();
		this.chart8Options = this.getChart8Options();
		this.chart9Options = this.getChart9Options();
		this.chart10Options = this.getChart10Options();
		this.chart11Options = this.getChart11Options();
		this.chart12Options = this.getChart12Options();
  }
}
