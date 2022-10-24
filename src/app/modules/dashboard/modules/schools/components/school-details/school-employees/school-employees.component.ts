import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { matchValues } from 'src/app/core/classes/validation';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-employees',
  templateUrl: './school-employees.component.html',
  styleUrls: ['./school-employees.component.scss']
})
export class SchoolEmployeesComponent implements OnInit {

  @Input('employees') employees=[]
  first = 0
  rows = 4
  employeesItems: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration}
isEmployeeModelOpened=false

  
	// << FORMS >> //
	employeeForm= new FormGroup({
		role: new FormControl(null, Validators.required),
		status: new FormControl(),
		password: new FormControl(),
		confirmPassword: new FormControl('', matchValues('password'))
	},)



	get f () { return this.employeeForm.controls}
  
  constructor(
	private route: ActivatedRoute,
	private translate:TranslateService,
	private schoolsService:SchoolsService,
	) { }

ngOnInit(): void {
	this.getEmployees(this.schoolId)
}


getEmployees(schoolId){
	this.schoolsService.getSchoolEmployees(schoolId, this.filtration).subscribe()
}


paginationChanged(event: paginationState) {
	console.log(event);
	this.first = event.first
	this.rows = event.rows
}

}
