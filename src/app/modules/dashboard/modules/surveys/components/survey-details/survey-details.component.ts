import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCheck, faChevronDown, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { ISurveyQuestion } from 'src/app/core/Models/IAddSurvey';
import { IEditNewSurvey } from 'src/app/core/Models/IEditNewSurvey';
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

  selectedSurveyType : any;
  selectedSurveyQuestionType :any;
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


  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات',routerLink:'/dashboard/educational-settings/surveys' ,routerLinkActiveOptions:{exact: true}},
      { label: 'تفاصيل الاستبيان' ,routerLink:'/dashboard/educational-settings/surveys/survey-details' ,routerLinkActiveOptions:{exact: true} },
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
  }
  _fileName :string[] = [];
  fileName = 'file.pdf'


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
    public translationService: TranslationService,
    private toastr: ToastrService,
    private router: Router) {    const formOptions: AbstractControlOptions = {


    };
    this.assesmentFormGrp = fb.group({
      surveyType: ['', [Validators.required]],
      surveyTitle: ['', [Validators.required]],
      subjects: this.fb.array([])

    }, formOptions);

  }
  ngOnInit(): void {
    this.getSurveyById();
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


uploadFile(e) {
  this._fileName.push(e.target.files[0].name)
}

getSurveyById()
{
  this.surveyService.getSurveyById(Number(this._router.snapshot.paramMap.get('surveyId'))).subscribe(response=>{
    this.editSurvey = response ;
    console.log(this.editSurvey);
    this.selectedSurveyType = this.editSurvey.surveyType;
    this.selectedSurveyType == 'Optional' ? 
    this.selectedSurveyType = this.surveyType[1] :
    this.selectedSurveyType = this.surveyType[0];

    this.editSurvey.surveyQuestions.forEach((item)=>{
      this.addDataIntoSubject(item)
     })

    this.assesmentFormGrp.patchValue({
      surveyType: this.selectedSurveyType,
      surveyTitle: this.editSurvey.surveyTitle.ar
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





////////////////////////////////////////////////////////


addDataIntoSubject(item){

  this.selectedSurveyQuestionType = item.surveyQuestionType;

  switch (this.selectedSurveyQuestionType) {
    case 'SurveyMultiChoiceQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[0];
      break;
    }
    case 'SurveyAttachmentQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[1];
      break;
    }
    case 'نجوم': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[2];
      break;
    }
    case 'SurveyFreeTextQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[3];
      break;
    }
    default: {
      break;
    }
  }

    this.classSubjects.push(this.fb.group({
      surveyQuestionType: [this.selectedSurveyQuestionType],
      questionText: [item.questionText],
      attachment: [item.attachment],
      questionChoices: [item.questionChoices]
    }))
}
editNewSurvey: IEditNewSurvey = <IEditNewSurvey>{};
addsurveyQuestion: ISurveyQuestion = <ISurveyQuestion>{};
goToEditSurvey() {
  debugger
  console.log(this.assesmentFormGrp.value);
  this.editNewSurvey.surveyQuestions = [];
  this.editNewSurvey.title = { ar: '', en: '' };
  this.editNewSurvey.title.ar = this.assesmentFormGrp.value.surveyTitle;
  this.editNewSurvey.title.en = this.assesmentFormGrp.value.surveyTitle;
  this.editNewSurvey.surveytype = this.assesmentFormGrp.value.surveyType.code;


  this.assesmentFormGrp.value.subjects.forEach(element => {
    this.addsurveyQuestion.questionChoices = [];

    this.addsurveyQuestion.attachment = element.attachment;
    this.addsurveyQuestion.questionText = element.questionText;
    this.addsurveyQuestion.surveyQuestionType = element.surveyQuestionType.code;

    
    if (element.questionChoices != "" ) {
      this.addsurveyQuestion.questionChoices.push(element.questionChoices);
    }
    if (element.questionChoices1 != "") {
      this.addsurveyQuestion.questionChoices.push(element.questionChoices1);
    }
    if (element.questionChoices2 != "") {
      this.addsurveyQuestion.questionChoices.push(element.questionChoices2);
    }
    if (element.questionChoices3 != "") {
      this.addsurveyQuestion.questionChoices.push(element.questionChoices3);
    }
    let clone = {...this.addsurveyQuestion};
    //this.editNewSurvey.surveyQuestions.push(clone);
    
  })

 
  console.log("--- object to EDIT ---");
  console.log(this.editNewSurvey);

  // this.surveyService.Editsurvey(38,this.editNewSurvey).subscribe(res => {
  //   console.log(res);
  //   this.toastr.success('Add Successfully', '');
  //   this.router.navigateByUrl('/dashboard/educational-settings/surveys');
  // });

}
}
