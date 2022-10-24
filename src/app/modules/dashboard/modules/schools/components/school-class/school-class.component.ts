import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, addMinutes, endOfMonth, startOfDay, startOfWeek, subDays } from 'date-fns';
import { DateValidators } from 'src/app/core/classes/validation';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';

export interface Subject{
  name:string
  mandatory:boolean
  inFinalScore:boolean
}

export interface Track{
  name:string
  subjects: Subject[]
}
@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {

  // << ICONS >>
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  faPlus = faPlus
  faCheck = faCheck

	schoolId = this.route.snapshot.paramMap.get('schoolId')
  gradeId = this.route.snapshot.paramMap.get('gradeId')

  // << DASHBOARD HEADER DATA >>
  componentHeaderData: IHeader={
		breadCrump: [
      {label:'قائمه المدارس ',routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
      {label:'الاطلاع على معلومات المدرسه',routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
      {label:'تعديل صف',routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}/grade/${this.gradeId}`},
		],
		mainTitle:{ main: 'مدرسه الشارقه الابتدائيه' },
    subTitle: {main: this.translate.instant('dashboard.schools.editClass') , sub:'(الصف الرابع)'}
	}


  // << DATA >>
  days=[
    {name: 'السبت', index: 6},
    {name: 'الاحد', index: 0},
    {name: 'الاتنين', index: 1},
    {name: 'الثلاثاء', index: 2},
    {name: 'الاربعاء', index: 3},
    {name: 'الخميس', index: 4},
  ]

  tracks:Track[] =[
    {
      name:'علمى',
      subjects:[
        {name :"الرياضيات", mandatory:true, inFinalScore:false}
      ]
    },
    {
      name:'ادبى',
      subjects:[
        {name :"تاريخ", mandatory:true, inFinalScore:false},
        {name :"تاريخ", mandatory:true, inFinalScore:false}
      ]
    },
    {
      name:'علمى',
      subjects:[
        {name :"الرياضيات", mandatory:true, inFinalScore:false},
        {name :"الرياضيات", mandatory:true, inFinalScore:false},
        {name :"الرياضيات", mandatory:true, inFinalScore:false}
      ]
    },
  ]

  subjects=[
    {name :"الرياضيات", mandatory:true, inFinalScore:false},
    {name :"الاحياء", mandatory:true, inFinalScore:false},
    {name :"العلوم", mandatory:true, inFinalScore:false}
  ]

  // sessionTimeForm= {
  //   day: null,
  //   startTime: null,
  //   endTime: null
  // }

  sessionTimeForm=this.fb.group({
    day: [null ],
    startTime: [null],
    endTime: [null]
  },{validators: [
      DateValidators.greaterThan('startTime', 'endTime'), 
      DateValidators.dateRange('startTime', 'endTime')
    ]})

	get sessionFormCtr () { return this.sessionTimeForm.controls}

  events: CalendarEvent[] = [
    {  
      start: subDays(addHours(startOfDay(new Date()), 2), 1),
      end: addHours(new Date(), 2),
      title: 'A 3 day event',
      color: { ...this.calendarService.colors['red'] },
      actions: this.calendarService.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...this.calendarService.colors['yellow'] },
      actions: this.calendarService.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...this.calendarService.colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 5),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...this.calendarService.colors['yellow'] },
      actions: this.calendarService.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];



  // << CONDITIONS >>
  step=1
  withTracks = true
  addClassModelOpened=false

    
  
  // << FORMS >>
  gradeForm= this.fb.group({
    name: [''],
    descriptionAvilibilty:[''],
    classSchedule:[],
    tracks: this.fb.array([]),
    subjects:this.fb.array([])
  })

  // << FORM CONTROLS >> //
  get gradeTracks(){ return this.gradeForm.controls['tracks'] as FormArray }
  getGradeTrack = (index) => (this.gradeTracks.controls[index] as FormGroup)
  getTrackSubjects = (index) => (this.getGradeTrack(index).controls['subjects'] as FormArray)
  get classSubjects(){ return this.gradeForm.controls['subjects'] as FormArray }

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private calendarService:CalendarService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

    this.initForm()
       
  }


  // << FORM METHODS >> //
  initForm(){    
    if(this.withTracks) this.fillTracks()
    else this.fillSubjects()
  }

  fillTracks(){    
    this.tracks.forEach((el, index) => {
      this.gradeTracks.push(this.fb.group({
        name:[el.name],
        subjects: this.fillTrackSubjects(index, el.subjects)
      }))
    })
    
  }

  fillTrackSubjects(trackIndex, subjects: Subject[]){
    let trackSubjectsArr = this.fb.array([]) as FormArray
    subjects.forEach(subject =>{
      trackSubjectsArr.push(this.fb.group({
        name:[subject.name],
        mandatory:[subject.mandatory],
        inFinalScore:[subject.inFinalScore]
      }))
    })

    return trackSubjectsArr
  }

  fillSubjects(){
    this.subjects.forEach(subject =>{
      this.classSubjects.push(this.fb.group({
          name:[subject.name],
          mandatory:[subject.mandatory],
          inFinalScore:[subject.inFinalScore]
        })
      )

    })
  }

  newTrackGroup(){
    return this.fb.group({
      name: '',
      subjects: this.fb.array([])
    })
  }

  newSubjectGroup(){
    return this.fb.group({
      name:[''],
      mandatory:[''],
      inFinalScore:['']
    })
  }

  addDivision(){
    this.gradeTracks.push(this.newTrackGroup())
  }

  addSubjectToTrack(trackId){
    this.getTrackSubjects(trackId).push(this.newSubjectGroup())
  }

  addSubject(){
    this.classSubjects.push(this.newSubjectGroup())
  }




  disabledDates=[new Date().setHours(5)]

  addClassStudy(event){
    event.preventDefault()
    this.addClassModelOpened=false

    const {startTime ,endTime , day} = this.sessionTimeForm.value
    
    let startTimeDate = this.getDate(startTime, day.index)
    let endTimeDate = this.getDate(endTime, day.index)


    let classEvent: CalendarEvent = {
      start: startTimeDate,
      end : endTimeDate,
      title: 'Math Class'
    }
    
    this.events = [...this.calendarService.addEvent(this.events, classEvent)]
  }


  getDate(date:Date , day:Day){
    const DAY = date.getDay()
    const HOURS = date.getHours()
    const MINUTS = date.getMinutes()

    let DATE = new Date(date)

    if(DAY >= day) DATE = addDays(startOfWeek(DATE), day)
    else DATE = subDays(startOfWeek(DATE), day)
    
    DATE = addHours(DATE,HOURS)
    DATE = addMinutes(DATE,MINUTS)

    return DATE
  }


  // sessionForm(){

  // }


  selectedStartTime() {

  }
  selectedEndTime() {

  }

  openAddClassModel() {
    this.addClassModelOpened = true
  }
}
