import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-accept-information',
  templateUrl: './accept-information.component.html',
  styleUrls: ['./accept-information.component.scss']
})
export class AcceptInformationComponent implements OnInit {
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Input('formGroup') studentForm:FormGroup
  
  lang =inject(TranslationService).lang;
  booleanOptions = this.sharedService.booleanOptions
  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)

  constructor(
    public childService:RegisterChildService,
    private sharedService:SharedService,
    private indexService :IndexesService) { }

  student$: Observable<Student> = this.childService.Student$

  ngOnInit(): void {
  }

}
