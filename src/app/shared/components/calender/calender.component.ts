import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';

import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import { CalendarService } from '../../services/calendar/calendar.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomDateFormatter } from '../../services/calendar-localization/date-formater.provider';



@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalenderComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input('events') events: CalendarEvent[]
  @Input('editableEvents') editableEvents: boolean;
  @Output('onEventClicked') onEventClicked =new EventEmitter()

  counter=0
  faPlus =faPlus
  
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = 'ar';

  refresh = new Subject<void>();

  subjects=[]
  subjectName=''
  eventEditMode =false

  activeDayIsOpen: boolean = true;

  constructor(private calendarService:CalendarService) {}

  ngOnInit(): void {

    
  }

  cellClicked(e){
    
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }



  getTime(date: Date){
    let hours: number = date.getHours();
    let minutes: number |string = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}${ampm}`
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  eventClicked(e :CalendarEvent){
    this.eventEditMode =true
    console.log(e);

    if(this.editableEvents) this.onEventClicked.emit(e)
    
  }

  addSubject(subjectName){
    
    this.subjects.push(subjectName)
    this.subjectName=''
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
