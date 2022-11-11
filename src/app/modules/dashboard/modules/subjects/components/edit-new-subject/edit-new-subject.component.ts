import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AssessmentService } from 'src/app/modules/dashboard/modules/assessment/service/assessment.service';
import { SubjectService } from '../../service/subject.service';



@Component({
  selector: 'app-new-subject',
  templateUrl: './edit-new-subject.component.html',
  styleUrls: ['./edit-new-subject.component.scss']
})
export class EditNewSubjectComponent implements OnInit {
  isLabelShown:boolean=false;
  subject:ISubject={} as ISubject;
  addedSubject;
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
  oldAssesmentList;

  constructor(private headerService: HeaderService,private assessmentService:AssessmentService,private toastService: ToastService,private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private subjectServise: SubjectService, private translate: TranslateService) {

    this.subjectFormGrp = fb.group({

      subjectNameInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      subjectNameInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      minmumDegree: [''],
      maximumDegree: [''],
      subjectCode: [''],
      exemptableStatus:[''],
      oldEvaluation: [''],
      evaluationType: ['',[Validators.required]],
      descriptionArr: fb.array([])

    });
  }

  ngOnInit(): void {
   this.assessmentService.getRates().subscribe((res)=>{this.oldAssesmentList=res.data;}) 
    this.subjectAddedList.push({} as ISubject );
    this.evaluationTypeList=this.subjectServise.evaluationTypeList;
    this.successStatusList=this.subjectServise.successStatus;
    this.route.paramMap.subscribe(param => {
      this.urlParameter =param.get('subjectId');

      if(!this.urlParameter)
      {
        this.addFieldsinFormArray();
      }

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
  get descriptionArr():FormArray {
    return this.subjectFormGrp.controls['descriptionArr'] as FormArray;
  }
  get description() {
    return this.subjectFormGrp.controls['description'] as FormControl;
  }
  get meaning() {
    return this.subjectFormGrp.controls['meaning'] as FormControl;
  }
  get successfulRetry() {
    return this.subjectFormGrp.controls['successfulRetry'] as FormControl;
  }


  isToggleLabel(e)
  {
    if(e.checked)
    {
      if(this.urlParameter)
      {
        this.subject.isExemptableToLeave=true;
      
      }
      else
      {
        this.isLabelShown=true;
      }
  
    }
    else{
      if(this.urlParameter)
      {
        this.subject.isExemptableToLeave=false;
     
      }
      else
      {
        this.isLabelShown=false;
      }
     
    }
  }

  checkEvaluationType(e)
  {
    
   console.log(e);
    if(e==4)
    {
      this.showDegree=false;
      this.showIpPoints=false;
      this.showDescription=false;
      this.showEvaluation=true;

      this.minmumDegree.clearValidators();
      this.minmumDegree.updateValueAndValidity(); 
      this.maximumDegree.clearValidators();
      this.maximumDegree.updateValueAndValidity(); 

    }
    else if(e==2)
    {
      this.showIpPoints=false;
      this.showDescription=false;
      this.showEvaluation=false;
      this.showDegree=true;

      this.minmumDegree.setValidators([Validators.required,Validators.min(0)]);
      this.maximumDegree.setValidators([Validators.required,Validators.min(0)]);
   

    }
    else if(e==1)
    {
      this.showDescription=false;
      this.showDegree=false;
      this.showEvaluation=false;
      this.showIpPoints=true;

      this.minmumDegree.setValidators([Validators.required,Validators.min(0)]);
      this.maximumDegree.setValidators([Validators.required,Validators.min(0)]);
      



    }
    else if(e==3)
    {
      this.showEvaluation=false;
      this.showDegree=false;
      this.showIpPoints=false;
      this.showDescription=true;

      this.minmumDegree.clearValidators();
      this.minmumDegree.updateValueAndValidity(); 
      this.maximumDegree.clearValidators();
      this.maximumDegree.updateValueAndValidity(); 
 

    }
    else
    {console.log("");}
  }

  addNew() {
    var availableadd = 1;

    console.log(this.descriptionArr.controls)
    for(let i in this.descriptionArr.controls)
    { console.log(this.descriptionArr.controls[i].value)
      if ((this.descriptionArr.controls[i].value.meaning=='' ) && (this.descriptionArr.controls[i].value.successStatus=='' ) && (this.descriptionArr.controls[i].value.explanation==''))

        { 
        console.log("noooooooo");

          availableadd = 0;
        }
   }
    if (availableadd == 1) {
      this.descriptionArr.push(this.fb.group({
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
    console.log(this.subjectFormGrp.value);
    this.addedSubject={};
    this.addedSubject.isExemptableToLeave=this.subjectFormGrp.value.exemptableStatus!=''?true:false;
    console.log( this.addedSubject.isExemptableToLeave);
    this.isBtnLoading = true;
    this.addedSubject={
      id:Number(this.urlParameter),
      name:{ar:this.subjectFormGrp.value.subjectNameInArabic,en:this.subjectFormGrp.value.subjectNameInEnglish },
      nameOnScoreScreen:{ar:this.subjectFormGrp.value.nameInResultsScreenInArabic,en:this.subjectFormGrp.value.nameInResultsScreenInEnglish},
      evaluationSystem:this.subjectFormGrp.value.evaluationType,
      subjectCode:this.subjectFormGrp.value.subjectCode,
      isExemptableToLeave:this.addedSubject.isExemptableToLeave
     };
     if( this.addedSubject.evaluationSystem==1||this.addedSubject.evaluationSystem==2)
     {
      this.addedSubject.maximumDegree=this.subjectFormGrp.value.maximumDegree;
      this.addedSubject.minimumDegree=this.subjectFormGrp.value.minmumDegree;
      this.addedSubject.subjectDescriptions=[];
      this.addedSubject.rateId=null;
     }
     else if( this.addedSubject.evaluationSystem==4)
     {
      this.addedSubject.rateId=this.subjectFormGrp.value.oldEvaluation;
      this.addedSubject.maximumDegree=null;
      this.addedSubject.minimumDegree=null;
      this.addedSubject.subjectDescriptions=[];
     }
     else if( this.addedSubject.evaluationSystem==3)
     {
      console.log(this.subjectFormGrp.value.description)
      this.addedSubject.subjectDescriptions=this.subjectFormGrp.value.descriptionArr;
      this.addedSubject.rateId=null;
      this.addedSubject.maximumDegree=null;
      this.addedSubject.minimumDegree=null;
     }
     console.log(this.addedSubject)
     if(this.urlParameter)
      {
        this.subjectServise.updateRole(this.addedSubject).subscribe((res)=>{
          this.isBtnLoading = false;
          this.toastService.success(this.translate.instant('dashboard.Subjects.Subject edited Successfully'));
          this.router.navigate(['/dashboard/educational-settings/subject/subjects-list']);
         },(err)=>{
          this.isBtnLoading = false;
          this.toastService.error(this.translate.instant('dashboard.Subjects.error,please try again'));
        });
      }
      else
      { 
          this.subjectServise.addSubject(this.addedSubject).subscribe((res)=>{
          this.isBtnLoading = false;
          this.toastService.success(this.translate.instant('dashboard.Subjects.Subject added Successfully'));
          this.router.navigate(['/dashboard/educational-settings/subject/subjects-list']);
         },(err)=>{
          this.isBtnLoading = false;
          this.toastService.error(this.translate.instant('dashboard.Subjects.error,please try again'));

        })
      }
  }
  bindOldSubject(subject)
  {
    if(this.urlParameter)
    {  
      this.evaluationTypeList.forEach(element => {
        if(element.name.en==subject.evaluationSystem)
        {subject.evaluationSystem=element.id}
       });
        this.subjectFormGrp.patchValue({subjectNameInArabic:subject.name.ar,
          subjectNameInEnglish:subject.name.en,
          nameInResultsScreenInArabic:subject.nameOnScoreScreen.ar,
          nameInResultsScreenInEnglish:subject.nameOnScoreScreen.en,
          evaluationType:subject.evaluationSystem,
          exemptableStatus:subject.isExemptableToLeave,
          subjectCode:subject.subjectCode,
          maximumDegree:subject.maximumDegree
          ,minmumDegree:subject.minimumDegree,
          oldEvaluation:subject.rateId
        });
        
        if(subject.subjectDescriptions.length)
        {subject.subjectDescriptions.forEach(element => {
            this.descriptionArr.push(this.fb.group({
              description: [element.description],
              meaning: [element.meaning],
              successfulRetry: [element.successfulRetry]
            }));
          });
       }
       else if(!subject.subjectDescriptions.length)
        {  
          this.addFieldsinFormArray();
        }


     this.checkEvaluationType(subject.evaluationSystem);

      }

  }
  addFieldsinFormArray()
  {
    this.descriptionArr.push(this.fb.group({
      description: [''],
      meaning: [''],
      successfulRetry: ['']
    }));
  }

}

