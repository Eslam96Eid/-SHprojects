import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay, subDays } from 'date-fns';
import { IHeader, paginationState } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';

@Component({
  selector: 'app-school-division',
  templateUrl: './school-division.component.html',
  styleUrls: ['./school-division.component.scss']
})
export class SchoolDivisionComponent implements OnInit {

 // << ICONS >> //
 faChevronCircleLeft=faChevronLeft
 faPlus =faPlus
 faClose=faClose
 
 schoolId = this.route.snapshot.paramMap.get('schoolId')
 divisionId = this.route.snapshot.paramMap.get('divisionId')

 // << DASHBOARED HEADER DATA >> //
 componentHeaderData: IHeader={
   breadCrump: [
     {label:'قائمه المدارس ',routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
     {label:'الاطلاع على معلومات المدرسه',routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
     {label:'تعديل الشعبه',routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}/division/${this.divisionId}`},
   ],
   mainTitle:{ main: 'مدرسه الشارقه الابتدائيه' },
   subTitle: {main: this.translate.instant('dashboard.schools.editTrack'), sub:'(B 1)'}
 }


 // << CONDITIONS >> //
 searchText=''
 addStudentModelOpened = false
 openSubjectsModel=false
 addStudentsModelOpened=false
 transferStudentModelOpened=false
 absenceModelOpened=false
 step =1
 first=0
 rows =4

 // << DATA SOURCE >> //
 selectedSubjects=[]
 eventSubjects=[]
 selectedEventId

 selectedStudents=[]

 schoolClasses:any[] =[

 {
   "id": "1001",
   "code": "nvklal433",
   "name": "Black Watch",
   "description": "Product Description",
   "image": "black-watch.jpg",
   "price": 72,
   "category": "Accessories",
   "quantity": 61,
   "inventoryStatus": "INSTOCK",
   "rating": 4
 },
 {
   "id": "1001",
   "code": "nvklal433",
   "name": "Black Watch",
   "description": "Product Description",
   "image": "black-watch.jpg",
   "price": 72,
   "category": "Accessories",
   "quantity": 61,
   "inventoryStatus": "INSTOCK",
   "rating": 4
 },
 {
   "id": "1000",
   "code": "f230fh0g3",
   "name": "Bamboo Watch",
   "description": "Product Description",
   "image": "bamboo-watch.jpg",
   "price": 65,
   "category": "Accessories",
   "quantity": 24,
   "inventoryStatus": "INSTOCK",
   "rating": 5
 },
 {
   "id": "1001",
   "code": "nvklal433",
   "name": "Black Watch",
   "description": "Product Description",
   "image": "black-watch.jpg",
   "price": 72,
   "category": "Accessories",
   "quantity": 61,
   "inventoryStatus": "INSTOCK",
   "rating": 4
 },
 {
   "id": "1000",
   "code": "f230fh0g3",
   "name": "Bamboo Watch",
   "description": "Product Description",
   "image": "bamboo-watch.jpg",
   "price": 65,
   "category": "Accessories",
   "quantity": 24,
   "inventoryStatus": "INSTOCK",
   "rating": 5
 },
 {
   "id": "1001",
   "code": "nvklal433",
   "name": "Black Watch",
   "description": "Product Description",
   "image": "black-watch.jpg",
   "price": 72,
   "category": "Accessories",
   "quantity": 61,
   "inventoryStatus": "INSTOCK",
   "rating": 4
 },
 {
   "id": "1002",
   "code": "zz21cz3c1",
   "name": "Blue Band",
   "description": "Product Description",
   "image": "blue-band.jpg",
   "price": 79,
   "category": "Fitness",
   "quantity": 2,
   "inventoryStatus": "LOWSTOCK",
   "rating": 3
 },
 {
   "id": "1003",
   "code": "244wgerg2",
   "name": "Blue T-Shirt",
   "description": "Product Description",
   "image": "blue-t-shirt.jpg",
   "price": 29,
   "category": "Clothing",
   "quantity": 25,
   "inventoryStatus": "INSTOCK",
   "rating": 5
 },
 ]

 events: CalendarEvent[] = [
   {
     id:'1',
     start: addDays(addHours(startOfDay(new Date()), 10), 1),
     end: addDays(addHours(startOfDay(new Date()), 11), 1),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['رياضيات','علوم']
     }
   },
   {
     id:'2',
     start: subDays(addHours(startOfDay(new Date()), 10), 1),
     end: subDays(addHours(startOfDay(new Date()), 12), 1),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['احياء','جولوجيا']
     }
   },
   {
     id:'3',
     start: subDays(addHours(startOfDay(new Date()), 8), 2),
     end: subDays(addHours(startOfDay(new Date()), 9), 2),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['رياضيات','علوم']
     }
   },
   {
     id:'4',
     start: subDays(addHours(startOfDay(new Date()), 9), 3),
     end: subDays(addHours(startOfDay(new Date()), 10), 3),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['كمياء','عربى']
     }
   },
   // {
   //   start: startOfDay(new Date()),
   //   title: 'An event with no end date',
   //   color: { ...this.calendarService.colors['yellow'] },
   //   actions: this.calendarService.actions,
   // },
   // {
   //   start: subDays(endOfMonth(new Date()), 3),
   //   end: addDays(endOfMonth(new Date()), 3),
   //   title: 'A long event that spans 2 months',
   //   color: { ...this.calendarService.colors['blue'] },
   //   allDay: true,
   // },
   {
     id:"5",
     start: addHours(startOfDay(new Date()), 9),
     end: addHours(startOfDay(new Date()), 13),
     title: 'A draggable and resizable event',
     color: { ...this.calendarService.colors['yellow'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['علم نفس','فزياء']
     }
   },
 ];

 subjectsTeachers=[
   {teatcher:{name: 'عادل'},subject:'الرياضيات'},
   {teatcher:{name: 'محمد'},subject:'احياء'},
   {teatcher:{name: 'تميم'},subject:'علم نفس'},
 ]

 selectedTracks=[]
 AllTracks=[
   {id:1, name: 'علمى',},
   {id:2, name: 'ادبى'},
   {id:3, name: 'علوم تجريبية'},
   {id:4, name: 'سياسه واقتصاد'}
 ]

 track={
   id:12321,
   class: {name:'الرابع'},
   maxStudentNumber:300,
   name:'B1',
   forSpecialAbilities:false,
   tracks:[{id:1, name: 'علمى'} ,{id:2, name: 'ادبى'}],
   manager: {name:'محمد القادر'},
   addDegreesAvilability:true,
   teachers: [
     {teacher:{name: 'عادل'},subject:'الرياضيات'},
     {teacher:{name: 'محمد'},subject:'احياء'},
     {teacher:{name: 'تميم'},subject:'علم نفس'},
   ]
 }


 studentsList=[
   {
     id: '#1',
     firstName: "كمال",
     lastName: 'أشرف',
   },
   {
     id: '#2',
     firstName: "أشرف",
     lastName: 'عماري',
   },
  //  {
  //    id: '#3',
  //    firstName: "كمال",
  //    lastName: 'حسن',
  //  },
  //  {
  //    id: '#4',
  //    firstName: "أشرف",
  //    lastName: 'عماري',
  //  },
  //  {
  //    id: '#5',
  //    firstName: "كمال",
  //    lastName: 'أشرف',
  //  },
  //  {
  //    id: '#6',
  //    firstName: "أشرف",
  //    lastName: 'عماري',
  //  },
 ]

 absencStudents = [
   {
     id: '#813155',
     firstName: "كمال",
     lastName: 'أشرف',
     withCause:true
   },
   {
     id: '#813155',
     firstName: "أشرف",
     lastName: 'عماري',
     withCause:null
   },
   {
     id: '#813155',
     firstName: "كمال",
     lastName: 'حسن',
     withCause:null
   },

 ]



 // << FORMS >> //

 absenceStudentsForm={
  date:'',
  students:[
  ]
 }


 trackForm= this.fb.group({
   id:[],
   class:[],
   maxStudentNumber:[],
   name:[],
   forSpecialAbilities:[],
   tracks: this.fb.array([]),
   manager:[],
   addDegreesAvilability:[],
   teachers: this.fb.array([]),

 })

 addStudentForm= this.fb.group({
   student:[],
   track:[],
   subjects:[[]]
 })

 // << FORM CONTROLS >> //
 get teachers (){ return this.trackForm.controls['teachers'] as FormArray}
 get tracks (){ return this.trackForm.controls['tracks'] as FormArray}


 constructor(
   private translate: TranslateService,
   private headerService:HeaderService,
   private calendarService:CalendarService,
   private fb : FormBuilder,
   private route: ActivatedRoute,
 ) { }

 ngOnInit(){

   this.headerService.changeHeaderdata(this.componentHeaderData)
   this.initForm()
 }


 initForm(){
   this.selectedTracks.push(...this.track.tracks)

   this.trackForm.patchValue({...this.track})
   
   this.fillTeachres()
   console.log(this.trackForm.value);
   
 }

 fillTeachres(){
   this.subjectsTeachers.forEach(el =>{
     this.teachers.push(this.fb.group({
       teacher:[el.teatcher],
       subject:[el.subject]
     }))
   })
 }


// << CALENDAR METHODS >> //
 eventClicked(e){
   this.selectedEventId=e.id
   this.openSubjectsModel=true
 }

 addSubjectsToCalendarEvent(event:Event, id){
   event.preventDefault()
   let selectedEvent = this.events.find((e)=> e.id == id)
   selectedEvent.meta.subjects = [...selectedEvent.meta.subjects,...this.eventSubjects]
   this.events = [...this.events]
   
   this.openSubjectsModel = false
 }



 submitTracksForm(){

 }

 
 addStudentsToAbsenceRecords(){
   
   this.absencStudents = [...this.absencStudents,...this.selectedStudents]
   
   this.addStudentsModelOpened = false
 }

 deleteRecord(index) {
   this.absencStudents.splice(index, 1)
 }

 openAddStudentModel(){
   this.addStudentModelOpened=true
 }


 paginationChanged(event:paginationState){
   console.log(event);
   this.first = event.first
   this.rows = event.rows

 }

}
