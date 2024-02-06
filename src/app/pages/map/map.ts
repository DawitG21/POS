import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppVariablesService } from '../../service/app-variables.service';
// @ts-ignore
import jsVectorMap from 'jsvectormap';

@Component({
  selector: 'map',
  templateUrl: './map.html',
  styleUrls: [ './map.css' ],
  encapsulation: ViewEncapsulation.None
})

export class MapPage {
  code1: any;
	appVariables = this.appVariablesService.getAppVariables();
  		
  constructor(private appVariablesService: AppVariablesService, private http: HttpClient) {
		this.appVariablesService.variablesReload.subscribe(() => {
			this.appVariables = this.appVariablesService.getAppVariables();
			this.renderMap();
		});
	}
	
	renderMap() {
		var elm = document.getElementById('mapContainer') as HTMLElement;
		if (elm) {
			elm.innerHTML = '<div id="map" class="h-300px"></div>';
			
			new jsVectorMap({
				selector: '#map',
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
	
	ngOnInit() {
		this.http.get('assets/data/map/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
	}	
	
	ngAfterViewInit() {
		this.renderMap();
	}
}
