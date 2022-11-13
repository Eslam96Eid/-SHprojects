import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowRight, faCheck, faChevronDown, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { ISurveyQuestion } from 'src/app/core/Models/IAddSurvey';
import { IEditSurvey } from 'src/app/core/Models/IeditSurvey';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { AssessmentService } from '../../../assessment/service/assessment.service';
import { SurveyService } from '../../service/survey.service';


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
  surveyType = [
    { name: 'اجباري', code: 1 },
    { name: 'اختياري', code: 0 }
  ];
  surveyQuestionType = [
    { name: 'اختياري من متعدد', code: 1 },
    { name: 'ملف', code: 2 },
    { name: 'نجوم', code: 3 },
    { name: 'نص حر ', code: 0 }
  ];
  editSurvey: IEditSurvey = <IEditSurvey>{};
  subjects: ISurveyQuestion[]
  faCheck = faCheck
  assesmentFormGrp: FormGroup;
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
  surveyTpe_SelectedItem=''

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
  _fileName :string[] = [];
  fileName = 'file.pdf'
  values = ['A', 'B']

  // breadCrumb
  items: MenuItem[] = [
    { label: 'قائمه الاستبيانات ' },
    { label: 'إنشاء استبيان جديد' },

  ];
  get classSubjects(){ return this.assesmentFormGrp.controls['subjects'] as FormArray }

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService, private fb:FormBuilder,    private layoutService: LayoutService,
    private assessmentService: AssessmentService,
    private surveyService: SurveyService,
    private _router: ActivatedRoute,
    public translationService: TranslationService,) {    const formOptions: AbstractControlOptions = {


    };
    this.assesmentFormGrp = fb.group({
      surveyType: ['', [Validators.required]],
      surveyTitle: ['', [Validators.required]],
      subjects: this.fb.array([])

    }, formOptions);

  }
  ngOnInit(): void {
    this.getSurveyById();
    this.addSubject();
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
    this.subjects.forEach(subject => {
      this.classSubjects.push(this.fb.group({
        surveyQuestionType: [subject.surveyQuestionType],
        questionText: [subject.questionText],
        attachment: [subject.attachment],
        questionChoices: [subject.questionChoices]
      }))
    })
  }

  newSubjectGroup(){
    return this.fb.group({
      surveyQuestionType: [''],
      questionText: [''],
      attachment: [''],
      questionChoices: ['']
    })
  }
  addSubject(){
    this.classSubjects.push(this.newSubjectGroup())
  }


onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}
uploadFile(e) {
  this._fileName.push(e.target.files[0].name)
  // this.fileName = e.target.files[0].name
}
getSurveyById()
{
  this.surveyService.getSurveyById(Number(this._router.snapshot.paramMap.get('surveyId'))).subscribe(response=>{
    this.editSurvey = response ;
    this.assesmentFormGrp.patchValue({
      surveyType: this.editSurvey.surveyType,
      surveyTitle: this.editSurvey.surveyTitle.ar,
      subjects:this.editSurvey.surveyQuestions
    })
  })
}

onChangesurveyQuestionType(event: any , i:any) {
  const QuestionChoicesDiv = document.getElementById( `div_questionChoices_${i}`) as HTMLInputElement | null;
  const attachmentDiv = document.getElementById( `div_attachment_${i}`) as HTMLInputElement | null;
  let typeOfQuestion = event.value.name.toString();
  switch (typeOfQuestion) {
    case 'اختياري من متعدد': {
      QuestionChoicesDiv.style.display = 'block';
      attachmentDiv.style.display = 'none';
      break;
    }
    case 'ملف': {
      QuestionChoicesDiv.style.display = 'none';
      attachmentDiv.style.display = 'block';
      break;
    }
    case 'نجوم': {
      QuestionChoicesDiv.style.display = 'none';
      attachmentDiv.style.display = 'none';
      break;
    }
    case 'نص حر ': {
      QuestionChoicesDiv.style.display = 'block';
      attachmentDiv.style.display = 'none';
      break;
    }
    default: {
      break;
    }
  }
}

}
