import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import { SubjectService } from '../../service/subject.service';



@Component({
  selector: 'app-new-subject',
  templateUrl: './edit-new-subject.component.html',
  styleUrls: ['./edit-new-subject.component.scss']
})
export class EditNewSubjectComponent implements OnInit {
  subject:ISubject={} as ISubject;
  addedSubject:{id?:number,name:{ar:'',en:''},nameOnScoreScreen:{ar:'',en:''},evaluationSystem:'',SubjectCode:'',oldEvaluation?:'',maximumDegree:'',minmumDegree:'',};
  subjectList:ISubject[] = [];
  subjectAddedList: ISubject[] = [];
  successStatusList;
  cities: string[];
  message:string="";
  isBtnLoading: boolean=false;
  empty:string="";
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  plusIcon= faPlus;
  rightIcon = faArrowRight;
  subjectFormGrp: FormGroup;
  isSubjectNotUnique: number = 0;
  urlParameter: string='';
  evaluationTypeList;
  evaluation:{id:0,name:{ar:"",en:""}};
  showDegree:boolean=false;
  showIpPoints:boolean=false;
  showDescription:boolean=false;
  showEvaluation:boolean=false;


  constructor(private headerService: HeaderService,private toastService: ToastService,private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private subjectServise: SubjectService, private translate: TranslateService) {

    this.subjectFormGrp = fb.group({

      subjectNameInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      subjectNameInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      minmumDegree: ['', [Validators.required,Validators.min(0)]],
      maximumDegree: ['',[Validators.required,Validators.min(0)]],
      SubjectCode: [''],
      oldEvaluation: [''],
      evaluationType: [''],
      description: fb.array([
        fb.group({
          explanation: [''],
          meaning: [''],
          successStatus: ['']
        })])


    });
  }

  ngOnInit(): void {
    this.subjectAddedList.push({} as ISubject );
    this.evaluationTypeList=this.subjectServise.evaluationTypeList;
    this.successStatusList=this.subjectServise.successStatus;
    this.route.paramMap.subscribe(param => {
      this.urlParameter =param.get('subjectId');

     this.subjectServise.getSubjectByID(Number(this.urlParameter)).subscribe((res)=>{this.subject=res;console.log(res);this.bindOldSubject(this.subject);});
    });

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'), routerLink: '/dashboard/educational-settings/subject/subjects-list' ,routerLinkActiveOptions:{exact: true}},
         {
             label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('dashboard.Subjects.Add New Subject'):this.translate.instant('dashboard.Subjects.Edit Subject'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/educational-settings/subject/new-subject':'/dashboard/educational-settings/subject/edit-subject/'+this.urlParameter
          }
     ],
      'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('dashboard.Subjects.Add New Subject'):this.translate.instant('dashboard.Subjects.Edit Subject')}
      }
    );


  }
  checkUniqueSubjectNameInArabic(e)
  {
    // this.isSubjectNotUnique=0;

    //  this.subjectServise.subjectsList.forEach(element => {

    //   if(element.subjectNameInArabic==e)
    //   {
    //     this.isSubjectNotUnique=1;
    //     return;
    //   }

    //  });
    //  this.isSubjectNotUnique=0;
  }

  checkUniqueNameInResultsScreenInArabic(e)
  {
    // this.isSubjectNotUnique=0;

    //  this.subjectServise.subjectsList.forEach(element => {

    //   if(element.subjectNameInEnglish==e)
    //   {
    //     this.isSubjectNotUnique=1;
    //     return;
    //   }

    //  });
    //  this.isSubjectNotUnique=0;

  }

  checkUniqueNameInResultsScreenInEnglish(e)
  {
    // this.isSubjectNotUnique=0;

    //  this.subjectServise.subjectsList.forEach(element => {

    //   if(element.subjectNameInEnglish==e)
    //   {
    //     this.isSubjectNotUnique=1;
    //     return;
    //   }

    //  });
    //  this.isSubjectNotUnique=0;

  }
  checkUniqueSubjectNameInEnglish(e)
  {
    // this.isSubjectNotUnique=0;

    //  this.subjectServise.subjectsList.forEach(element => {

    //   if(element.subjectNameInEnglish==e)
    //   {
    //     this.isSubjectNotUnique=1;
    //     return;
    //   }

    //  });
    //  this.isSubjectNotUnique=0;

  }

  get subjectNameInArabic() {
    return this.subjectFormGrp.controls['subjectNameInArabic'] as FormControl;
  }

  get subjectNameInEnglish() {
    return this.subjectFormGrp.controls['subjectNameInEnglish'] as FormControl;
  }

  get nameInResultsScreenInArabic() {
    return this.subjectFormGrp.controls['nameInResultsScreenInArabic'] as FormControl;
  }

  get nameInResultsScreenInEnglish() {
    return this.subjectFormGrp.controls['nameInResultsScreenInEnglish'] as FormControl;
  }

  get minmumDegree() {
    return this.subjectFormGrp.controls['minmumDegree'] as FormControl;
  }
  get maximumDegree() {
    return this.subjectFormGrp.controls['maximumDegree'] as FormControl;
  }
  get SubjectCode() {
    return this.subjectFormGrp.controls['SubjectCode'] as FormControl;
  }

  get evaluationType() {
    return this.subjectFormGrp.controls['evaluationType'] as FormControl;
  }
  get oldEvaluation() {
    return this.subjectFormGrp.controls['oldEvaluation'] as FormControl;
  }
  get description():FormArray {
    return this.subjectFormGrp.controls['description'] as FormArray;
  }
  get explanation() {
    return this.subjectFormGrp.controls['explanation'] as FormControl;
  }
  get meaning() {
    return this.subjectFormGrp.controls['meaning'] as FormControl;
  }
  get successStatus() {
    return this.subjectFormGrp.controls['successStatus'] as FormControl;
  }


  checkEvaluationType(e)
  {

    console.log(e)
    if(e.name.en=='Evaluation')
    {
      this.showDegree=false;
      this.showIpPoints=false;
      this.showDescription=false;
      this.showEvaluation=true;

    }
    else if(e.name.en=='Grades')
    {
      this.showIpPoints=false;
      this.showDescription=false;
      this.showEvaluation=false;
      this.showDegree=true;

    }
    else if(e.name.en=='IPpoints')
    {
      this.showDescription=false;
      this.showDegree=false;
      this.showEvaluation=false;
      this.showIpPoints=true;

    }
    else if(e.name.en=='Discription')
    {
      this.showEvaluation=false;
      this.showDegree=false;
      this.showIpPoints=false;
      this.showDescription=true;

    }
    else
    {console.log("");}
  }

  addNew() {
    var availableadd = 1;

    for(let i in this.description.controls)
    {
      if ((!this.subjectFormGrp.value.description[i].meaning ) || (!this.subjectFormGrp.value.description[i].successStatus ) || (!this.subjectFormGrp.value.description[i].explanation))

        {

          availableadd = 0;
        }
        }
    if (availableadd == 1) {
      this.description.push(this.fb.group({
        explanation: [''],
        meaning: [''],
        successStatus: ['']
      }));

    }
    availableadd == 1


  }
  getAllSubject()
  {
    this.subjectServise.getAllSubjects().subscribe((res)=>{
      this.subjectList=res.data;
      this.subjectList.forEach(subject => {
        if(subject.id==Number(this.urlParameter) )
        {

          this.bindOldSubject(subject);

         this.evaluationTypeList.forEach(element => {
          if(element.name.ar==subject.evaluationType)
            {
              this.evaluation=element;
              this.subjectFormGrp.patchValue({evaluationType:this.evaluation});
              if(element.name.ar==this.translate.instant('IPpoints'))
              {this.showIpPoints=true;}
              else if(element.name.ar==this.translate.instant('dashboard.Subjects.Grades'))
              {this.showDegree=true;}
              else if(element.name.ar==this.translate.instant('dashboard.Subjects.Discription'))
              {this.showDescription=true;}
              else if(element.name.ar==this.translate.instant('dashboard.Subjects.Evaluation'))
              {this.showEvaluation=true;}
              else
              {console.log(element.name.ar);}
            }
         });

        }

       });
    });

  }
  succeeded()
  {
    this.isBtnLoading = true;
    this.addedSubject={
      id:Number(this.urlParameter),
      name:{ar:this.subjectFormGrp.value.subjectNameInArabic,en:this.subjectFormGrp.value.subjectNameInEnglish },
      nameOnScoreScreen:{ar:this.subjectFormGrp.value.nameInResultsScreenInArabic,en:this.subjectFormGrp.value.nameInResultsScreenInEnglish},
      evaluationSystem:this.subjectFormGrp.value.evaluationType,
      SubjectCode:this.subjectFormGrp.value.subjectCode,
      maximumDegree:this.subjectFormGrp.value.maximumDegree
      ,minmumDegree:this.subjectFormGrp.value.minimumDegree,
      oldEvaluation:this.subjectFormGrp.value.oldEvaluation
     };
     console.log( this.subject);
     if(this.urlParameter)
      {
        this.subjectServise.updateRole(this.subject).subscribe((res)=>{
          this.isBtnLoading = false;
          this.toastService.success(this.translate.instant('dashboard.UserRole.JobRole edited Successfully'));
          this.router.navigate(['/dashboard/manager-tools/user-roles/user-roles-list']);
         },(err)=>{
          this.isBtnLoading = false;
        });
      }
      else
      {

        this.subjectServise.addSubject(this.subject).subscribe((res)=>{
          this.isBtnLoading = false;
          this.toastService.success(this.translate.instant('dashboard.UserRole.JobRole added Successfully'));
          this.router.navigate(['/dashboard/manager-tools/user-roles/user-roles-list']);
         },(err)=>{
          this.isBtnLoading = false;

        })
      }
  }
  bindOldSubject(subject)
  {
      this.evaluationTypeList.forEach(element => {
        if(element.name.ar==subject.evaluationSystem)
        {subject.evaluationSystem=element}
       });
        this.subjectFormGrp.patchValue({subjectNameInArabic:subject.name.ar,
          subjectNameInEnglish:subject.name.en,
          nameInResultsScreenInArabic:subject.nameOnScoreScreen.ar,
          nameInResultsScreenInEnglish:subject.nameOnScoreScreen.en,
          evaluationType:subject.evaluationSystem,
          SubjectCode:subject.subjectCode,
          maximumDegree:subject.maximumDegree
          ,minmumDegree:subject.minimumDegree
          ,
          oldEvaluation:subject.oldEvaluation

        });
        this.description.patchValue([{meaning:subject.meaning,successStatus:subject.successfulRetry
          ,explanation:subject.evaluationDescription
        }]);
     console.log(this.subjectFormGrp.value)
     this.checkEvaluationType(subject.evaluationSystem);

  }

}

