import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { passwordMatchValidator } from './password-validators';
import { faArrowRight, faExclamationCircle, faCheck, faEyeSlash, faEye, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

import Validation from '../../models/utils/validation';
import { IRole } from 'src/app/core/Models/IRole';


@Component({
  selector: 'app-add-new-user-information',
  templateUrl: './add-new-user-information.component.html',
  styleUrls: ['./add-new-user-information.component.scss']
})
export class AddNewUserInformationComponent implements OnInit {

  value1: string;

  @Input('content') content='';
  isShown:boolean=false;
  checked:boolean=true;
  checkIcon = faCheck;
  eyeIcon = faEye;
  slashEyeIcon = faEyeSlash;
  exclamationIcon = faExclamationCircle;
  cities: string[];
  faEllipsisVertical = faEllipsisVertical;
  selectedCities: string[];
  rightIcon = faArrowRight;
  userFormGrp: FormGroup;
  typeInputPass: string = 'password';
  typeInputConfirmPass: string = 'password';
  isUnique: number = 0;
  urlParameter: number=0;
  constructor(private fb: FormBuilder, private router: Router, private headerService: HeaderService, private translate: TranslateService, private userInformation: UserService) {
    const formOptions: AbstractControlOptions = {
      validators: passwordMatchValidator

    };

    this.userFormGrp = fb.group({

      fullName: ['', [Validators.required, Validators.maxLength(65)]],
      phoneNumber: ['', [Validators.required, Validators.required, Validators.pattern('[05]{1}[0-9]{10}')]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
      nickName: ['', [Validators.required, Validators.maxLength(65)]],
      identityNumber: ['', [Validators.required]],
      privateRole: ['', [Validators.required]],
      userStatus: ['', [Validators.required]]

    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }
  roles: IRole[] = [];
  getRoleList(){
    this.userInformation.GetRoleList().subscribe(response => {
		  this.roles = response;
      console.log(this.roles);
		})
  }
  ngOnInit(): void {
    this.userFormGrp.patchValue({
      userStatus: false
    })
this.getRoleList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.UserInformation.Add User') , routerLink: '/dashboard/manager-tools/user-information/new-user' ,routerLinkActiveOptions:{exact: true}}
        ],
        mainTitle: { main: this.translate.instant('dashboard.UserInformation.Add User') }
      }
    );
    this.cities = this.userInformation.cities;

    this.selectedCities = this.userInformation.selectedCities;


  }
  get fullName() {
    return this.userFormGrp.controls['fullName'];
  }

  get phoneNumber() {
    return this.userFormGrp.controls['phoneNumber'];
  }
  get userStatus() {
    return this.userFormGrp.controls['userStatus'];
  }

  get email() {
    return this.userFormGrp.controls['email'];
  }

  get password() {
    return this.userFormGrp.controls['password'];
  }
  get confirmPassword() {
    return this.userFormGrp.controls['confirmPassword'];
  }

  get nickName() {
    return this.userFormGrp.controls['nickName'];
  }
  get identityNumber() {
    return this.userFormGrp.controls['identityNumber'];
  }

  get privateRole() {
    return this.userFormGrp.controls['privateRole'];
  }
    isToggleLabel(e)
  {
    if(e.checked)
    {
      this.isShown=true;
      this.userFormGrp.patchValue({
        userStatus: false
      })
    }
    else{
      this.isShown=false;
      this.userFormGrp.patchValue({
        userStatus: true
      })
    }
  }
  CheckUniqueemail(e) {
    this.isUnique = 0;

    this.userInformation.usersList.forEach(element => {

      if (element.email == e) {
        this.isUnique = 1;
        return;
      }

    });
    this.isUnique = 0;
  }
  CheckUniquePhoneNumber(e) {
    this.isUnique = 0;

    this.userInformation.usersList.forEach(element => {

      if (element.phoneNumber == e) {
        this.isUnique = 1;
        return;
      }

    });
    this.isUnique = 0;

  }
  listOfRoles : IRole[] = [];
  selectedItems:IRole;
  listOfName : Array<string> ;
  onChange(event: any ) {
    debugger
    console.log( this.selectedItems)
    this.listOfName = [];
    this.listOfName.push( event.value.name);
    console.log( this.listOfName)
}

}
