import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faCheck, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { IHeader, ITitle } from 'src/app/core/Models/header-dashboard';
import { IAddSurvey, ISurveyQuestion } from 'src/app/core/Models/IAddSurvey';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SurveyService } from './../../service/survey.service';


@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {
  @ViewChild('#input1') input1: any;
  @ViewChild('#input2') input2: any;
  @ViewChild('#input3') input3: any;
Q1 :string;
Q2:string;
Q3:string;
  title = <ITitle>{};
  dropdownList = [];
  addSurvey: IAddSurvey = <IAddSurvey>{};
  addsurveyQuestion: ISurveyQuestion = <ISurveyQuestion>{};
  subjects: ISurveyQuestion[];
  selectedItems = [];
  cities: string[];
  choices: string[];
  faPlus = faPlus;
  step =1
  isQuestionChoicesShow = false;
  isAttachShow = false;
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
  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;
  assesmentFormGrp: FormGroup;
  dropdownSettings: IDropdownSettings;
  faArrowRight = faArrowRight
  faCheck = faCheck
  diseases = [{ name: 'سؤال 4' }, { name: 'سؤال 3' }, { name: 'سؤال 2' }, { name: 'سؤال 1' }];
  questiontype = [{ name: 'سؤال 4' }, { name: 'سؤال 3' }, { name: 'سؤال 2' }, { name: 'سؤال 1' }];
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات ', routerLink: '/dashboard/educational-settings/surveys/', routerLinkActiveOptions: { exact: true } },
      { label: 'إنشاء استبيان جديد', routerLink: '/dashboard/educational-settings/surveys/new-survey', routerLinkActiveOptions: { exact: true } },
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.createNewSurvey') },
  }


  fileName = 'file.pdf'
  _fileName :string[] = [];

  values = ['A', 'B'];
  // breadCrumb
  items: MenuItem[] = [
    { label: 'قائمه الاستبيانات ' },
    { label: 'إنشاء استبيان جديد' },

  ];
  get classSubjects() { return this.assesmentFormGrp.controls['subjects'] as FormArray }
  get canAddSubjects(): boolean {
    return this.assesmentFormGrp.get('subjects').valid; 
  }
  private getTranslateValue(key: string): string {
    return this.translate.instant(key);
  }
  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private router: Router, private Surveyservice: SurveyService,
    private toastr: ToastrService,
    private toastService: ToastService) {
    const formOptions: AbstractControlOptions = {};

    this.assesmentFormGrp = fb.group({
      surveyType: ['', [Validators.required]],
      surveyTitle: ['', [Validators.required]],
      subjects: this.fb.array([])

    }, formOptions);
  }


  ngOnInit(): void {
    this.add_Subject();
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark');
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('breadcrumb.surveyList'), routerLink: '/dashboard/educational-settings/surveys', routerLinkActiveOptions: { exact: true } },
          { label: this.translate.instant('dashboard.surveys.createNewSurvey'), routerLink: '/dashboard/educational-settings/surveys/new-survey', routerLinkActiveOptions: { exact: true } },
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
    }
  }
  // << FORMS >> //


  fillSubjects() {
    this.subjects.forEach(subject => {
      this.classSubjects.push(this.fb.group({
        surveyQuestionType: [subject.surveyQuestionType],
        questionText: [subject.questionText],
        attachment: [subject.attachment],
        questionChoices: [subject.questionChoices],
        questionChoices1: [subject.questionChoices],
        questionChoices2: [subject.questionChoices],
        questionChoices3: [subject.questionChoices],
      }))
    })
  }

  newSubjectGroup() {
    return this.fb.group({
      surveyQuestionType: ['', [Validators.required]],
      questionText: ['', [Validators.required]],
      attachment: [''],
      questionChoices: [''],
      questionChoices1: [''],
      questionChoices2: [''],
      questionChoices3: [''],
    })
  }
  addSubject() {
    if(this.canAddSubjects){
      this.classSubjects.push(this.newSubjectGroup());
    }else{
      this.toastService.warning(
        this.getTranslateValue('pleaseFillTheAboveRate'),
        this.getTranslateValue('warning'),
        {timeOut: 3000}
      );
    }
  }
  add_Subject() { this.classSubjects.push(this.newSubjectGroup()); }

  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }

  uploadFile(e,i) {
    debugger;
    console.log(e.target.files[0].name);
    console.log(this._fileName);
    this._fileName[i] = e.target.files[0].name;
   // this._fileName.push(e.target.files[0].name)
    console.log(this._fileName);
    // this.fileName = e.target.files[0].name
  }
  goToCancle() {
    this.router.navigateByUrl('/dashboard/educational-settings/surveys');
  }
  goToAddNew() {
    this.addSurvey.surveyQuestions = [];
    this.addSurvey.title = { ar: '', en: '' };
    this.addSurvey.title.ar = this.assesmentFormGrp.value.surveyTitle;
    this.addSurvey.title.en = this.assesmentFormGrp.value.surveyTitle;
    this.addSurvey.surveyType = this.assesmentFormGrp.value.surveyType.code;


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
      this.addSurvey.surveyQuestions.push(clone);
      
    })

   
    console.log("--- object to save ---");
    console.log(this.addSurvey);

    this.Surveyservice.AddSurvey(this.addSurvey).subscribe(res => {
      console.log(res);
      this.toastr.success('Add Successfully', '');
      this.router.navigateByUrl('/dashboard/educational-settings/surveys');
    });

  }

  onChangesurveyQuestionType(event: any , i:any) {
    const QuestionChoicesDiv = document.getElementById( `div_questionChoices_${i}`) as HTMLInputElement | null;
    const attachmentDiv = document.getElementById( `div_attachment_${i}`) as HTMLInputElement | null;
    let typeOfQuestion = event.value.name.toString();
    switch (typeOfQuestion) {
      case 'اختياري من متعدد': {
        QuestionChoicesDiv.style.display = 'block';
        attachmentDiv.style.display = 'none';
        this.RemoveQuestion(i)
        break;
      }
      case 'ملف': {
        QuestionChoicesDiv.style.display = 'none';
        attachmentDiv.style.display = 'block';
        this.RemoveQuestion(i)
        break;
      }
      case 'نجوم': {
        QuestionChoicesDiv.style.display = 'none';
        attachmentDiv.style.display = 'none';
        this.RemoveQuestion(i)
        break;
      }
      case 'نص حر ': {
        QuestionChoicesDiv.style.display = 'block';
        attachmentDiv.style.display = 'none';
        this.RemoveQuestion(i)
        break;
      }
      default: {
        break;
      }
    }
  }
counter = 0;
  AddQuestion(i: any) {
   
    this.counter++;
    const QuestionChoicesDiv1 = document.getElementById(`div_Added_1_questionChoices_${i}`) as HTMLInputElement | null;
    const QuestionChoicesDiv2 = document.getElementById(`div_Added_2_questionChoices_${i}`) as HTMLInputElement | null;
    const QuestionChoicesDiv3 = document.getElementById(`div_Added_3_questionChoices_${i}`) as HTMLInputElement | null;
    switch (this.counter ) {
      case 1: {
        QuestionChoicesDiv1.style.display = 'block';
        break;
      }
      case 2: {
        QuestionChoicesDiv2.style.display = 'block';
        break;
      }
      case 3: {
        QuestionChoicesDiv3.style.display = 'block';
        break;
      }
      default: {
        this.counter =0;
        break;
      }
    }
    // if (this.counter == 1) {
    //   QuestionChoicesDiv1.style.display = 'block';
    // }
    // if (this.counter == 2) {
    //   QuestionChoicesDiv2.style.display = 'block';
    // }
    // if (this.counter == 3) {
    //   QuestionChoicesDiv3.style.display = 'block';
    // }
    // else{
    //   this.counter=0;
    // }

  }

  RemoveQuestion(i){
 
    const QuestionChoicesDiv1 = document.getElementById(`div_Added_1_questionChoices_${i}`) as HTMLInputElement | null;
    const QuestionChoicesDiv2 = document.getElementById(`div_Added_2_questionChoices_${i}`) as HTMLInputElement | null;
    const QuestionChoicesDiv3 = document.getElementById(`div_Added_3_questionChoices_${i}`) as HTMLInputElement | null;
    QuestionChoicesDiv1.style.display = 'none';
    QuestionChoicesDiv2.style.display = 'none';
    QuestionChoicesDiv2.style.display = 'none';
    QuestionChoicesDiv3.style.display = 'none';
 
}
}
