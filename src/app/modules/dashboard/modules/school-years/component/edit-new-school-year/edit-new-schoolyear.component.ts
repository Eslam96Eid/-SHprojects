import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons';
import { IHeader } from 'src/app/core/Models';


@Component({
  selector: 'app-edit-new-schoolyear',
  templateUrl: './edit-new-schoolyear.component.html',
  styleUrls: ['./edit-new-schoolyear.component.scss']
})
export class EditNewSchoolyearComponent implements OnInit {
  checkIcon= faCheck;
  plusIcon=faPlus;
  cities: string[];
  schoolYearFormGrp:FormGroup;
  rightIcon=faArrowRight;
  exclamtionIcon=faExclamationCircle;
  urlParameter: number=0;
  step:number = 1;
  addCurriculumsModelOpened:boolean=false;
  TopStudentsModelOpened:boolean=false;
  sendModelOpened:boolean=false;
  addClassModelOpened:boolean=false;
  curriculumsList=["استرالي","صيني","هندي","مصري","استرالي","صيني","هندي","مصري","استرالي","صيني","هندي","مصري"];
 
  constructor(private headerService:HeaderService,private route: ActivatedRoute,private translate:TranslateService,private schoolYearServise:SchoolYearsService,private router:Router,private fb: FormBuilder) { 

    this.schoolYearFormGrp= fb.group({
      schoolYearName:['',[Validators.required,Validators.maxLength(32)]],
      schoolYearStartDate:['',[Validators.required]],
      schoolYearEndDate:['',[Validators.required]],
      weekendDays:['',[Validators.required]],
      ageDeterminationDate:['',[Validators.required]],
      AnnualHolidays:['',[Validators.required]]
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('schoolyearId'));
    });
    console.log(this.urlParameter);
    
    this.headerService.Header.next(

      {'breadCrump':[
        {label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list',routerLinkActiveOptions:{exact: true}},
        {
        label: (this.urlParameter==0||this.urlParameter.toString()=='')? this.translate.instant('breadcrumb.Add New School Year'):this.translate.instant('breadcrumb.Edit School Year'),
        routerLink: (this.urlParameter==0||this.urlParameter.toString()=='')? '/dashboard/educational-settings/school-year/new-school-year':'/dashboard/educational-settings/school-year/edit-school-year/'+this.urlParameter
        }
      ],
      mainTitle:{main:(this.urlParameter==0||this.urlParameter.toString()=='')? this.translate.instant('breadcrumb.Add New School Year'):this.translate.instant('breadcrumb.Edit School Year')}
      }
      );
      
   
      this.cities=this.schoolYearServise.cities;
  }

  get neededSchoolYear(){
    return this.schoolYearFormGrp.controls['neededSchoolYear'] as FormControl;
  }

  get schoolYearName() {
    return this.schoolYearFormGrp.controls['schoolYearName'] as FormControl;
  }

  get schoolYearStartDate() {
    return this.schoolYearFormGrp.controls['schoolYearStartDate'] as FormControl;
  }

  get schoolYearEndDate() {
    return this.schoolYearFormGrp.controls['schoolYearEndDate'] as FormControl;
  }

  get weekendDays() {
    return this.schoolYearFormGrp.controls['weekendDays'] as FormControl;
  }

  get ageDeterminationDate() {
    return this.schoolYearFormGrp.controls['ageDeterminationDate'] as FormControl;
  }
  get AnnualHolidays() {
    return this.schoolYearFormGrp.controls['AnnualHolidays'] as FormControl;
  }

  get curriculum() {
    return this.schoolYearFormGrp.controls['curriculum'] as FormControl;
  }
  get activateAge() {
    return this.schoolYearFormGrp.controls['activateAge'] as FormControl;
  }
  get ageRequirementToRegisterFromInsideCountry() {
    return this.schoolYearFormGrp.controls['ageRequirementToRegisterFromInsideCountry'] as FormControl;
  }
  get ageRequirementToRegisterFromOutsideCountry() {
    return this.schoolYearFormGrp.controls['ageRequirementToRegisterFromOutsideCountry'] as FormControl;
  }

  get class() {
    return this.schoolYearFormGrp.controls['class'] as FormControl;
  }
  get knownSubjectList() {
    return this.schoolYearFormGrp.controls['knownSubjectList'] as FormControl;
  }
  get subjectStatusInFinalTotal() {
    return this.schoolYearFormGrp.controls['subjectStatusInFinalTotal'] as FormControl;
  }
  get subjectStatus() {
    return this.schoolYearFormGrp.controls['subjectStatus'] as FormControl;
  }

}
