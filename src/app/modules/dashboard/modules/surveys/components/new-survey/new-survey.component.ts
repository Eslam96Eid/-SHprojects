import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowRight, faCheck, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/iheader';
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
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {
  dropdownList = [];
  subjects: Subject[]
  selectedItems = [];
  cities: string[];
  choices: string[];
  faPlus= faPlus;

  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;
  assesmentFormGrp: FormGroup;
  assesmentFormGrp2: FormGroup;
  dropdownSettings:IDropdownSettings;
  faArrowRight = faArrowRight
  faCheck = faCheck
  diseases=[{name:'سؤال 3'},{name:'سؤال 2'},{name:'سؤال 4'},{name:'سؤال 1'}];
  questiontype=[{name:'سؤال 3'},{name:'سؤال 2'},{name:'سؤال 4'},{name:'سؤال 1'}];
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات ' ,routerLink:'/dashboard/educational-settings/surveys/',routerLinkActiveOptions:{exact: true}},
      { label: 'إنشاء استبيان جديد',routerLink:'/dashboard/educational-settings/surveys/new-survey',routerLinkActiveOptions:{exact: true}},
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.createNewSurvey') },
  }


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
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private fb:FormBuilder,
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

  get assesmentName() {
    return this.assesmentFormGrp.controls['assesmentName'] as FormControl;
  }

  get assessment() {
    return this.assesmentFormGrp.controls['assessment'] as FormControl;
  }
  get deservingDegreesFrom() {
    return this.assesmentFormGrp.controls['deservingDegreesFrom'] as FormControl;
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
        'breadCrump': [
          { label: this.translate.instant('breadcrumb.surveyList'),routerLink:'/dashboard/educational-settings/surveys',routerLinkActiveOptions:{exact: true}},
          {  label: this.translate.instant('dashboard.surveys.createNewSurvey'),routerLink:'/dashboard/educational-settings/surveys/new-survey',routerLinkActiveOptions:{exact: true}},
        ],
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
    // << FORMS >> //


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
