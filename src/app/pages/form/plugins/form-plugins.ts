import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, 
         distinctUntilChanged, 
         map } from 'rxjs/operators';
import { NgbDateStruct, 
         NgbCalendar, 
         NgbDate, 
         NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'form-plugins',
  templateUrl: './form-plugins.html',
  styleUrls: [ './form-plugins.css' ],
  encapsulation: ViewEncapsulation.None
})

export class FormPluginsPage {
	datepickerDefaultValue: String = '';
	datepickerComponentValue: String = '';
	datepickerInlineDate: { year: number; month: number };
	datepickerInlineValue: NgbDateStruct;
	
	daterangepickerFromDate: NgbDate | null;
	daterangepickerToDate: NgbDate | null;
	daterangepickerHoveredDate: NgbDate | null = null;
	
	timepickerDefaultValue = { hour: 0, minute: 0 };
	timepickerComponentValue = { hour: 0, minute: 0 };
	timepickerComponentMeridian: boolean = true;
	timepickerInlineValue = { hour: 0, minute: 0 };
	
	typeaheadItems = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic', 'Congo, Republic of the', 'Costa Rica', 'Cote dIvoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Mongolia', 'Morocco', 'Monaco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', 'Sao Tome', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
  typeaheadSelectedItem = '';
	
	tagsInputValue = [];
  tagsInputValidator = Validators.required;
  
	maskedInputDate: any;
	maskedInputNumber: any;
	
	selectpickerSingleValue: number = 0;
	selectpickerSingleTags = [{ id: 1, name: 'Volvo' }, { id: 2, name: 'Saab' }, { id: 3, name: 'Opel' }, { id: 4, name: 'Audi' }];
	
	selectpickerMultipleValue: any[] = [];
	selectpickerMultipleTags = ['Uber', 'Microsoft', 'Flexigen'];
  
  colorpickerValue: string = '#333333';
	
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;
	code6: any;
	code7: any;
	code8: any;
	code9: any;
	
	addTagFn(name: any) {
		return { name: name, tag: true };
	}
	
	constructor(private calendar: NgbCalendar, private http: HttpClient, public formatter: NgbDateParserFormatter) {
		this.datepickerInlineValue = this.calendar.getToday();
		this.datepickerInlineDate = this.calendar.getToday();
		this.daterangepickerFromDate = calendar.getToday();
		this.daterangepickerToDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}
	
	onDateSelection(date: NgbDate) {
		if (!this.daterangepickerFromDate && !this.daterangepickerToDate) {
			this.daterangepickerFromDate = date;
		} else if (this.daterangepickerFromDate && !this.daterangepickerToDate && date && date.after(this.daterangepickerFromDate)) {
			this.daterangepickerToDate = date;
		} else {
			this.daterangepickerToDate = null;
			this.daterangepickerFromDate = date;
		}
	}
	
	isHovered(date: NgbDate) {
		return (
			this.daterangepickerFromDate && !this.daterangepickerToDate && this.daterangepickerHoveredDate && date.after(this.daterangepickerFromDate) && date.before(this.daterangepickerHoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.daterangepickerToDate && date.after(this.daterangepickerFromDate) && date.before(this.daterangepickerToDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.daterangepickerFromDate) ||
			(this.daterangepickerToDate && date.equals(this.daterangepickerToDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
	
	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
	
	formatTime(time: any) {
		var value = '00:00';
		if (time.hour || time.minute) {
			value = (time.hour < 9) ? '0'+ time.hour : time.hour;
			value += ':';
			value += (time.minute < 9) ? '0'+ time.minute : time.minute;
		}
		return value;
	}
	
  typeaheadSearch = (text$: Observable<string>) => text$.pipe(
		debounceTime(200),
		distinctUntilChanged(),
		map((term: string) => term.length < 2 ? [] : this.typeaheadItems.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
	);

  typeaheadFormatResult(item: any): string {
    return item;
  }
  
  changeComplete($event: ColorEvent) {
  	this.colorpickerValue = $event.color.hex;
  }
	
	ngOnInit() {
    this.http.get('assets/data/form-plugins/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/form-plugins/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/form-plugins/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/form-plugins/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/form-plugins/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
    this.http.get('assets/data/form-plugins/code-6.json', { responseType: 'text' }).subscribe(data => {
    	this.code6 = data;
		});
    this.http.get('assets/data/form-plugins/code-7.json', { responseType: 'text' }).subscribe(data => {
    	this.code7 = data;
		});
    this.http.get('assets/data/form-plugins/code-8.json', { responseType: 'text' }).subscribe(data => {
    	this.code8 = data;
		});
    this.http.get('assets/data/form-plugins/code-9.json', { responseType: 'text' }).subscribe(data => {
    	this.code9 = data;
		});
  }
}
