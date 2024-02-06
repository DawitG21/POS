import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AppSettings } from '../../service/app-settings.service';
import { AppVariablesService } from '../../service/app-variables.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.html'
})

export class CalendarPage {
  @ViewChild('externalEvents') externalEvents!: ElementRef;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  
  appVariables = this.appVariablesService.getAppVariables();
  date = new Date();
	currentYear = this.date.getFullYear();
	defaultMonth = this.date.getMonth() + 1;
	currentMonth = (this.defaultMonth < 10) ? '0' + this.defaultMonth : this.defaultMonth;
	
	calendarOptions: CalendarOptions = this.getCalendarOptions();
  
	constructor(private appSettings: AppSettings, private appVariablesService: AppVariablesService, externalEvents: ElementRef) {
		this.appVariablesService.variablesReload.subscribe(() => {
			this.appVariables = this.appVariablesService.getAppVariables();
			this.reloadCalendar();
		});
	}
	
	reloadCalendar() {
		this.calendarOptions = this.getCalendarOptions();
  }
	
	getCalendarOptions() {
		return {
			initialView: 'dayGridMonth',
			plugins: [dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin, interactionPlugin],
			headerToolbar: {
				left: 'dayGridMonth,timeGridWeek,timeGridDay',
				center: 'title',
				right: 'prev,next today'
			},
			buttonText: {
				today:    'Today',
				month:    'Month',
				week:     'Week',
				day:      'Day'
			},
			editable: true,
			droppable: true,
			themeSystem: 'bootstrap',
			views: {
				timeGrid: {
					eventLimit: 6
				}
			},
			events: [{
				title: 'Trip to London',
				start: this.currentYear + '-'+ this.currentMonth +'-01',
				end: this.currentYear + '-'+ this.currentMonth +'-05',
				color: this.appVariables.color.theme
			},{
				title: 'Meet with Irene Wong',
				start: this.currentYear + '-'+ this.currentMonth +'-02T06:00:00',
				color: this.appVariables.color.primary
			},{
				title: 'Mobile Apps Brainstorming',
				start: this.currentYear + '-'+ this.currentMonth +'-10',
				end: this.currentYear + '-'+ this.currentMonth +'-12',
				color: this.appVariables.color.pink
			},{
				title: 'Stonehenge, Windsor Castle, Oxford',
				start: this.currentYear + '-'+ this.currentMonth +'-05T08:45:00',
				end: this.currentYear + '-'+ this.currentMonth +'-06T18:00',
				color: this.appVariables.color.indigo
			},{
				title: 'Paris Trip',
				start: this.currentYear + '-'+ this.currentMonth +'-12',
				end: this.currentYear + '-'+ this.currentMonth +'-16'
			},{
				title: 'Domain name due',
				start: this.currentYear + '-'+ this.currentMonth +'-15',
				color: this.appVariables.color.primary
			},{
				title: 'Cambridge Trip',
				start: this.currentYear + '-'+ this.currentMonth +'-19'
			},{
				title: 'Visit Apple Company',
				start: this.currentYear + '-'+ this.currentMonth +'-22T05:00:00',
				color: this.appVariables.color.success
			},{
				title: 'Cambridge Trip',
				start: this.currentYear + '-'+ this.currentMonth +'-19',
				end: this.currentYear + '-'+ this.currentMonth +'-19'
			},{
				title: 'Visit Apple Company',
				start: this.currentYear + '-'+ this.currentMonth +'-22T05:00:00',
				color: this.appVariables.color.success
			},{
				title: 'Exercise Class',
				start: this.currentYear + '-'+ this.currentMonth +'-22T07:30:00',
				color: this.appVariables.color.warning
			},{
				title: 'Live Recording',
				start: this.currentYear + '-'+ this.currentMonth +'-22T03:00:00',
				color: this.appVariables.color.primary
			},{
				title: 'Announcement',
				start: this.currentYear + '-'+ this.currentMonth +'-22T15:00:00',
				color: this.appVariables.color.danger
			},{
				title: 'Dinner',
				start: this.currentYear + '-'+ this.currentMonth +'-22T18:00:00'
			},{
				title: 'New Android App Discussion',
				start: this.currentYear + '-'+ this.currentMonth +'-25T08:00:00',
				end: this.currentYear + '-'+ this.currentMonth +'-25T10:00:00',
				color: this.appVariables.color.danger
			},{
				title: 'Marketing Plan Presentation',
				start: this.currentYear + '-'+ this.currentMonth +'-25T12:00:00',
				end: this.currentYear + '-'+ this.currentMonth +'-25T14:00:00',
				color: this.appVariables.color.primary
			},{
				title: 'Chase due',
				start: this.currentYear + '-'+ this.currentMonth +'-26T12:00:00',
				color: this.appVariables.color.warning
			},{
				title: 'Heartguard',
				start: this.currentYear + '-'+ this.currentMonth +'-26T08:00:00',
				color: this.appVariables.color.warning
			},{
				title: 'Lunch with Richard',
				start: this.currentYear + '-'+ this.currentMonth +'-28T14:00:00',
				color: this.appVariables.color.primary
			},{
				title: 'Web Hosting due',
				start: this.currentYear + '-'+ this.currentMonth +'-30',
				color: this.appVariables.color.primary
			}]
		};
	}
	
	ngAfterViewInit() {
		var containerEl = this.externalEvents.nativeElement;
		new Draggable(containerEl, {
			itemSelector: '.fc-event-link',
			eventData: function(eventEl) {
				return {
					title: eventEl.innerText,
					color: eventEl.getAttribute('data-color')
				};
			}
		});
	
  	setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
	}
	
	ngOnInit() {
    this.appSettings.appContentFullHeight = true;
    this.appSettings.appContentClass = 'p-0';
  }

  ngOnDestroy() {
    this.appSettings.appContentFullHeight = false;
    this.appSettings.appContentClass = '';
  }
}
