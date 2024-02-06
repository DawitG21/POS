import { Component, ViewEncapsulation } from '@angular/core';
import { AppVariablesService } from '../../service/app-variables.service';
// @ts-ignore
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: [ './dashboard.css' ],
  encapsulation: ViewEncapsulation.None
})

export class DashboardPage {
  appVariables = this.appVariablesService.getAppVariables();
  
  statData: any = {};
  serverData: any = {};
  trafficData: any = {};
  productData: any = {};
  activityLogData: any = {};
	
	getStatData() {
		return [
			{ 
				title: 'SITE VISITORS', total: '4.2m', 
				info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '33.3% more than last week' }, { icon: 'far fa-user fa-fw me-1', text: '45.5% new visitors' }, { icon: 'far fa-times-circle fa-fw me-1', text: '3.25% bounce rate'} ],
				chart: {
					options: { chart: { type: 'bar', sparkline: { enabled: true }, height: 30 }, colors: [this.appVariables.color.theme], plotOptions: { bar: { horizontal: false, columnWidth: '65%',	endingShape: 'rounded' } }, stroke: {} },
					series: [{ name: 'Visitors', data: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()] }]
				}
			},
			{ 
				title: 'STORE SALES', total: '$35.2K',
				info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '20.4% more than last week' }, { icon: 'fa fa-shopping-bag fa-fw me-1', text: '33.5% new orders' }, { icon: 'fa fa-dollar-sign fa-fw me-1', text: '6.21% conversion rate'} ],
				chart: {
					options: { chart: { type: 'line', sparkline: { enabled: true }, height: 30 }, colors: [this.appVariables.color.theme], stroke: { curve: 'straight', width: 2 } },
					series: [{ name: 'Visitors', data: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()] }]
				}
			},
			{ title: 'NEW MEMBERS', total: '4,490',
				info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '59.5% more than last week' }, { icon: 'fab fa-facebook-f fa-fw me-1', text: '45.5% from facebook' }, { icon: 'fab fa-youtube fa-fw me-1', text: '15.25% from youtube'} ],
				chart: {
					height: 45,
					options: { chart: { type: 'pie', sparkline: { enabled: true }, height: 45 }, colors: ['rgba('+ this.appVariables.color.themeRgb + ', 1)', 'rgba('+ this.appVariables.color.themeRgb + ', .75)', 'rgba('+ this.appVariables.color.themeRgb + ', .5)'], stroke: { show: false } },
					series: [this.randomNo(), this.randomNo(), this.randomNo()]
				}
			},
			{
				title: 'BANDWIDTH', total: '4.5TB',
				info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '5.3% more than last week' }, { icon: 'far fa-hdd fa-fw me-1', text: '10.5% from total usage' }, { icon: 'far fa-hand-point-up fa-fw me-1', text: '2MB per visit'} ],
				chart: {
					options: { chart: { type: 'donut', sparkline: { enabled: true }, height: 45 }, colors: ['rgba('+ this.appVariables.color.themeRgb + ', .15)', 'rgba('+ this.appVariables.color.themeRgb + ', .35)', 'rgba('+ this.appVariables.color.themeRgb + ', .55)', 'rgba('+ this.appVariables.color.themeRgb + ', .75)', 'rgba('+ this.appVariables.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + this.appVariables.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
					series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
				}
			}
		];
	}
	
	getServerData() {
		return {
			chart: {
				series: [
					{ name: 'MEMORY USAGE', data: [ this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo() ] },
					{ name: 'CPU USAGE', data: [ this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo() ] }
				],
				options: {
					colors: ['rgba('+ this.appVariables.color.inverseRgb + ', .25)', this.appVariables.color.theme],
					xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { show: false,  style: { colors: this.appVariables.color.bodyColor, fontSize: '12px', fontFamily: this.appVariables.font.bodyFontFamily, fontWeight: 400, cssClass: 'apexcharts-xaxis-label' } }, axisBorder: { show: true, color: 'rgba('+ this.appVariables.color.bodyColorRgb + ', .25)', height: 1, width: '100%', offsetX: 0, offsetY: -1 }, axisTicks: { show: true, borderType: 'solid', color: 'rgba('+ this.appVariables.color.bodyColorRgb + ', .25)', height: 6, offsetX: 0, offsetY: 0 } },
					yaxis: { labels: { style: { colors: this.appVariables.color.bodyColor, fontSize: '12px', fontFamily: this.appVariables.font.bodyFontFamily, fontWeight: 400, cssClass: 'apexcharts-xaxis-label' } } },
					fill: { opacity: .65 },
					tooltip: { y: { formatter: (val: any) => { return "$ " + val + " thousands" } }, style: { fontSize: '12px', fontFamily: this.appVariables.font.bodyFontFamily } },
					chart: { height: '100%', type: 'bar', toolbar: { show: false } },
					plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
					dataLabels: { enabled: false },
					grid: { show: true, borderColor: 'rgba('+ this.appVariables.color.inverseRgb +', .15)' },
					stroke: { show: false },
					legend: { fontFamily: this.appVariables.font.bodyFontFamily, labels: { colors: this.appVariables.color.bodyColor } }
				}
			},
			stats: [
				{
					name: 'DISK USAGE', total: '20.04 / 256 GB', progress: '20%', time: 'Last updated 1 min ago',
					info: [ { title: 'DISK C', value: '19.56GB', class: 'text-theme' }, { title: 'DISK D', value: '0.50GB', class: 'text-theme text-opacity-50' } ],
					chart: {
						options: { chart: { type: 'donut', sparkline: { enabled: true }, height: 50 }, colors: ['rgba('+ this.appVariables.color.themeRgb + ', .15)', 'rgba('+ this.appVariables.color.themeRgb + ', .35)', 'rgba('+ this.appVariables.color.themeRgb + ', .55)', 'rgba('+ this.appVariables.color.themeRgb + ', .75)', 'rgba('+ this.appVariables.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + this.appVariables.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
						series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
					}
				},
				{
					name: 'BANDWIDTH', total: '83.76GB / 10TB', progress: '10%', time: 'Last updated 1 min ago',
					info: [ { title: 'HTTP', value: '35.47GB', class: 'text-theme' }, { title: 'FTP', value: '1.25GB', class: 'text-theme text-opacity-50' } ],
					chart: {
						options: { chart: { type: 'donut', sparkline: { enabled: true }, height: 50 }, colors: ['rgba('+ this.appVariables.color.themeRgb + ', .15)', 'rgba('+ this.appVariables.color.themeRgb + ', .35)', 'rgba('+ this.appVariables.color.themeRgb + ', .55)', 'rgba('+ this.appVariables.color.themeRgb + ', .75)', 'rgba('+ this.appVariables.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + this.appVariables.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
						series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
					}
				}
			]
		};
	}
	
	getTrafficData() {
		return {
			country: [
				{ name: 'FRANCE',	visits: '13,849', pct: '40.79%', class: '' },
				{ name: 'SPAIN',	visits: '3,216', pct: '9.79%', class: '' },
				{ name: 'MEXICO',	visits: '1,398', pct: '4.26%', class: 'fw-bold text-theme' },
				{ name: 'UNITED STATES',	visits: '1,090', pct: '3.32%', class: '' },
				{ name: 'BELGIUM',	visits: '1,045', pct: '3.18%', class: ''}
			],
			source: [
				{ name: 'FEED', percentage: '25.70%', class: 'bg-theme bg-opacity-95' },
				{ name: 'ORGANIC', percentage: '24.30%', class: 'bg-theme bg-opacity-75' },
				{ name: 'REFERRAL', percentage: '23.05%', class: 'bg-theme bg-opacity-55' },
				{ name: 'DIRECT', percentage: '14.85%', class: 'bg-theme bg-opacity-35' },
				{ name: 'EMAIL', percentage: '7.35%', class: 'bg-theme bg-opacity-15' }
			],
			chart: {
				options: { chart: { type: 'donut', sparkline: { enabled: true }, height: 70 }, colors: ['rgba('+ this.appVariables.color.themeRgb + ', .15)', 'rgba('+ this.appVariables.color.themeRgb + ', .35)', 'rgba('+ this.appVariables.color.themeRgb + ', .55)', 'rgba('+ this.appVariables.color.themeRgb + ', .75)', 'rgba('+ this.appVariables.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + this.appVariables.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
				series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
			}
		};
	}
	
	getProductData() {
		return [
			{ img: '/assets/img/dashboard/product-1.jpeg', sku: 'SKU90400', title: 'Huawei Smart Watch', price: '$399.00', qty: '129', revenue: '$51,471', profit: '$15,441' }, 
			{ img: '/assets/img/dashboard/product-2.jpeg', sku: 'SKU85999', title: 'Nike Shoes Black Version', price: '$99.00', qty:	'108', revenue: '$10,692', profit:	'$5,346' }, 
			{ img: '/assets/img/dashboard/product-3.jpeg', sku: 'SKU20400', title: 'White Sony PS4', price: '$599', qty: '72', revenue: '$43,128', profit:	'$4,312' },
			{ img: '/assets/img/dashboard/product-4.jpeg', sku: 'SKU19299', title: 'Apple Watch Series 5', price: '$1,099', qty: '53', revenue: '$58,247', profit:	'$2,912' },
			{ img: '/assets/img/dashboard/product-5.jpeg', sku: 'SKU19299', title: 'Black Nikon DSLR', price: '1,899', qty: '50', revenue: '$90,950', profit:	'$2,848' }
		];
	}
	
	getActivityLogData() {
		return [
			{ title: 'You have sold an item - $1,299', time: 'just now', badge: 'PRODUCT', highlight: true},
			{ title: 'Firewall upgrade', time: '1 min ago', badge: 'SERVER', highlight: false},
			{ title: 'Push notification v2.0 installation', time: '1 mins ago', badge: 'ANDROID', highlight: false},
			{ title: 'New Subscription - 1yr Plan', time: '1 min ago', badge: 'SALES', highlight: true},
			{ title: '2 Unread enquiry', time: '2 mins ago', badge: 'ENQUIRY', highlight: false},
			{ title: '$30,402 received from Paypal', time: '2 mins ago', badge: 'PAYMENT', highlight: true},
			{ title: '3 payment received', time: '5 mins ago', badge: 'PAYMENT', highlight: true},
			{ title: '1 pull request from github', time: '5 mins ago', badge: 'GITHUB', highlight: false},
			{ title: '3 pending invoice to generate', time: '5 mins ago', badge: 'INVOICE', highlight: false},
			{ title: '2 new message from fb messenger', time: '7 mins ago', badge: 'INBOX', highlight: false}
		];
	}
	
	renderMap() {
		var elm = document.getElementById('trafficMapContainer') as HTMLElement;
    if (elm) {
      elm.innerHTML = '<div id="trafficMap" class="h-100"></div>';
      
      new jsVectorMap({
        selector: '#trafficMap',
        map: 'world',
        zoomButtons: true,
        normalizeFunction: 'polynomial',
        hoverOpacity: 0.5,
        hoverColor: false,
        zoomOnScroll: false,
        series: {
          regions: [{
            normalizeFunction: 'polynomial'
          }]
        },
        focusOn: {
          x: 0.5,
          y: 0.5,
          scale: 1
        },
        labels: {
          markers: {
            render: (marker: any) => marker.name
          }
        },
        markers: [
          { name: "Egypt", coords: [26.8206, 30.8025] },
          { name: "Russia", coords: [61.524, 105.3188] },
          { name: "Canada", coords: [56.1304, -106.3468] },
          { name: "Greenland", coords: [71.7069, -42.6043] },
          { name: "Brazil", coords: [-14.235, -51.9253] }
        ],
        markerStyle: {
          initial: {
            fill: this.appVariables.color.theme,
            stroke: 'none',
            r: 5,
          },
          hover: {
            fill: this.appVariables.color.theme
          }
        },
        markerLabelStyle: {
          initial: {
            fontFamily: this.appVariables.font.bodyFontFamily,
            fontSize: '12px',
            fill: 'rgba('+ this.appVariables.color.inverseRgb + ', .75)'
          },
        },
        regionStyle: {
          initial: {
            fill: this.appVariables.color.inverse,
            fillOpacity: 0.25,
            stroke: 'none',
            strokeWidth: 0.4,
            strokeOpacity: 1
          },
          hover: {
            fillOpacity: 0.5
          }
        },
        backgroundColor: 'transparent',
      });
    }
	}
	
	randomNo() {
		return Math.floor(Math.random() * 60) + 30
	}
	
	ngOnInit() {
		this.statData = this.getStatData();
		this.serverData = this.getServerData();
		this.trafficData = this.getTrafficData();
		this.productData = this.getProductData();
		this.activityLogData = this.getActivityLogData();
		this.renderMap();
	}
	
	constructor(private appVariablesService: AppVariablesService) {
		this.appVariablesService.variablesReload.subscribe(() => {
			this.appVariables = this.appVariablesService.getAppVariables();
			this.statData = this.getStatData();
			this.serverData = this.getServerData();
			this.trafficData = this.getTrafficData();
			this.productData = this.getProductData();
			this.activityLogData = this.getActivityLogData();
			this.renderMap();
		});
	}
}
