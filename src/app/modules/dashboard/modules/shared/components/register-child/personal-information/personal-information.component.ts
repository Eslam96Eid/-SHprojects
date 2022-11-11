import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable, share } from 'rxjs';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  lang =inject(TranslationService).lang;
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Input('formGroup') studentForm:FormGroup
  
  faXmark =faXmark



  student$: Observable<Student> = this.childService.Student$

  isLoading=false
  editStudentinfoMode =false

  studentId = +this.route.snapshot.paramMap.get('id')

  changeIdentityModelOpened=false
  
    // << DATA PLACEHOLDER >> //

  genderOptions=this.sharedService.genderOptions
  booleanOptions = this.sharedService.booleanOptions
  countries$ = this.CountriesService.getCountries()
  cities = this.CountriesService.cities
  cities$ = this.CountriesService.getCities()
  states$ = this.CountriesService.getAllStates()
  talents$ = this.studentsService.getTalents()
  nationalitiesCategory$ = this.indexService.getIndext(IndexesEnum.NationalityCategory)
  religions= this.sharedService.religions
    // << FORMS >> //

  constructor(
    private fb:FormBuilder,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public childService:RegisterChildService,
    private indexService:IndexesService) { }


  ngOnInit(): void {
    // this.getStudent(this.studentId)
    setTimeout(()=>{

      console.log(this.studentForm.value);
    },2000)
    
  }

  getStudent(studentId){
    this.isLoading = true
    this.studentsService.getStudent(studentId).subscribe((res:GenericResponse<Student>) =>{
      this.isLoading = true
    })
  }


  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }

}

