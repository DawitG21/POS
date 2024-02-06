import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../service/app-settings.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

@Component({
  selector: 'page-data-management',
  templateUrl: './page-data-management.html',
  styleUrls: [ './page-data-management.css' ],
  encapsulation: ViewEncapsulation.None
})

export class DataManagementPage {
  private dataTable: any;
  private tableOptions: any = {};
  
	constructor(private appSettings: AppSettings) { }
	
	ngAfterViewInit() {
		var height = window.innerHeight - 217;
		
    this.tableOptions = {
			dom: "<'row'<'col-7 col-md-6 d-flex justify-content-start'f><'col-5 col-md-6 text-end'>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5 fs-12px'i><'col-sm-12 col-md-7 fs-12px'p>>",
			scrollY:        height,
			scrollX:        true,
			paging:         false,
			order: [[1, 'asc']],
			columnDefs: [
				{ targets: 'no-sort', orderable: false }
			]
		};
  	setTimeout(() => {
			this.dataTable = $('#datatable').DataTable(this.tableOptions);
  	}, 100);
  }
	
	ngOnInit() {
    this.appSettings.appContentClass = 'py-3';
    this.appSettings.appContentFullHeight = true;
  }
  
  ngOnDestroy() {
    this.appSettings.appContentClass = '';
    this.appSettings.appContentFullHeight = false;
  }
}
