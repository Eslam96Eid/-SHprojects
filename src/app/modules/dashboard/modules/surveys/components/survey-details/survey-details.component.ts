import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowRight, faCheck, faChevronDown, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { AssessmentService } from '../../../assessment/service/assessment.service';


export interface Subject{
  Assessment:string
  deservingDegreesFrom:string
  deservingDegreesTo:string
  chronicDiseases:string
  status:string
}

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {
  subjects: Subject[]
  faCheck = faCheck
  assesmentFormGrp: FormGroup;
  assesmentFormGrp2: FormGroup;
  faChevronDown = faChevronDown
  dropdownList = [];
  dropdownSettings:IDropdownSettings;
  selectedItems = [];
  cities: string[];
  choices: string[];
  step =1
  faPlus= faPlus;

  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;


  faArrowRight = faArrowRight

  //popup modals

  targetsModalOpend = false
  responsesModalOpend = false
  diseases=[{name:'سؤال 3'},{name:'سؤال 2'},{name:'سؤال 4'},{name:'سؤال 1'}];
  questiontype=[{name:'سؤال 3'},{name:'سؤال 2'},{name:'سؤال 4'},{name:'سؤال 1'}];
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات',routerLink:'/dashboard/educational-settings/surveys' ,routerLinkActiveOptions:{exact: true}},
      { label: 'تفاصيل الاستبيان' ,routerLink:'/dashboard/educational-settings/surveys/survey-details' ,routerLinkActiveOptions:{exact: true} },
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
  }



  surveyDetails = [
    {
      questionText: "هل المدرسة تدعم النقل الجماعي؟",
      questionType: 'اختيار من متعدد',
      questionOptions: ['A', 'B', 'C', 'D']
    }
  ]

  schoolClasses: any[] = [

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

  ]
  fileName = 'file.pdf'
  values = ['A', 'B']

  // breadCrumb
  items: MenuItem[] = [
    { label: 'قائمه الاستبيانات ' },
    { label: 'إنشاء استبيان جديد' },

  ];
  get classSubjects(){ return this.assesmentFormGrp.controls['subjects'] as FormArray }
  get classSubjectsTwo(){ return this.assesmentFormGrp2.controls['subjects'] as FormArray }
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService, private fb:FormBuilder,    private layoutService: LayoutService,
    private assessmentService: AssessmentService) {    const formOptions: AbstractControlOptions = {


    };
    this.assesmentFormGrp = fb.group({

      assesmentName: ['', [Validators.required, Validators.maxLength(65)]],
      maximumDegree: ['', [Validators.required, Validators.min(0)]],
      minmumDegree: ['', [Validators.required, Validators.min(0)]],
      assessment: ['', [Validators.required]],
      deservingDegreesFrom: [''],
      deservingDegreesTo: [''],
      status: ['', [Validators.required]],
      subjects:this.fb.array([])

    }, formOptions);
    this.assesmentFormGrp2 = fb.group({

      assesmentName: ['', [Validators.required, Validators.maxLength(65)]],
      maximumDegree: ['', [Validators.required, Validators.min(0)]],
      minmumDegree: ['', [Validators.required, Validators.min(0)]],
      assessment: ['', [Validators.required]],
      deservingDegreesFrom: [''],
      deservingDegreesTo: [''],
      status: ['', [Validators.required]],
      subjects:this.fb.array([])

    }, formOptions);
  }
  // get assesmentName() {
  //   return this.assesmentFormGrp.controls['assesmentName'] as FormControl;
  // }

  get assessment() {
    return this.assesmentFormGrp.controls['assessment'] as FormControl;
  }
  get deservingDegreesFrom() {
    return this.assesmentFormGrp.controls['deservingDegreesFrom'] as FormControl;
  }
  get chronicDiseases() {
    return this.assesmentFormGrp.controls['chronicDiseases'] as FormControl;
  }

  get status() {
    return this.assesmentFormGrp.controls['status'] as FormControl;
  }
  get status2() {
    return this.assesmentFormGrp2.controls['status'] as FormControl;
  }
  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

    this.layoutService.changeTheme('dark');
    this.headerService.Header.next(
      {
        breadCrump: [
          { label: 'قائمه الاستبيانات' ,routerLink:'/dashboard/educational-settings/surveys',routerLinkActiveOptions:{exact: true}},
          { label: 'تفاصيل الاستبيان',routerLink:'/dashboard/educational-settings/surveys/survey-details',routerLinkActiveOptions:{exact: true} }],
          mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
      }
    );
    this.dropdownList = [
      { item_id: 1, item_text: 'سؤال 1' },
      { item_id: 2, item_text: 'سؤال 2' },
      { item_id: 3, item_text: 'سؤال 3' },
      { item_id: 4, item_text: 'سؤال 4' },
      { item_id: 5, item_text: 'سؤال 5' },
      { item_id: 6, item_text: 'سؤال 6' },
      { item_id: 7, item_text: 'سؤال 7' },
      { item_id: 8, item_text: 'سؤال 8' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'سؤال 3' },
      { item_id: 4, item_text: 'سؤال 4' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'عدم تحديد الكل',
      itemsShowLimit: 5,

      // allowSeachFilter: true
   }
  //  this.cities = this.assessmentService.cities;
  //  this.choices = this.assessmentService.choices;
  }


  fillSubjects(){
    this.subjects.forEach(subject =>{
      this.classSubjects.push(this.fb.group({
        Assessment:[subject.Assessment],
        deservingDegreesFrom:[subject.deservingDegreesFrom],
        deservingDegreesTo:[subject.deservingDegreesTo],
        chronicDiseases:[subject.chronicDiseases],
        status:[subject.status]
        })
      )

    })
  }
  fillSubjects2(){
    this.subjects.forEach(subject =>{
      this.classSubjectsTwo.push(this.fb.group({
        Assessment:[subject.Assessment],
        deservingDegreesFrom:[subject.deservingDegreesFrom],
        deservingDegreesTo:[subject.deservingDegreesTo],
        chronicDiseases:[subject.chronicDiseases],
        status:[subject.status]
        })
      )

    })
  }
  newSubjectGroup(){
    return this.fb.group({
      Assessment:[''],
      deservingDegreesFrom:[''],
      deservingDegreesTo:[''],
      chronicDiseases:[''],
      status:['']
    })
  }
  newSubjectGroup2(){
    return this.fb.group({
      Assessment:[''],
      deservingDegreesFrom:[''],
      deservingDegreesTo:[''],
      chronicDiseases:[''],
      status:['']
    })
  }
  addSubject(){
    this.classSubjects.push(this.newSubjectGroup())
  }
  addSubjectTwo(){
    this.classSubjectsTwo.push(this.newSubjectGroup2())
  }

onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}

uploadFile(e) {
  this.fileName = e.target.files[0].name
}
}
