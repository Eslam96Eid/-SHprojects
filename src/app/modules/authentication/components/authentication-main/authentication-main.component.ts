import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { faArrowRight ,faExclamationCircle,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-authentication-main',
  templateUrl: './authentication-main.component.html',
  styleUrls: ['./authentication-main.component.scss'],
  providers: [MessageService]

})
export class AuthenticationMainComponent implements OnInit {
  modes = {
    username: 'username_mode',
    password: 'password_mode',
    setPassword: 'setPassword_mode',
  }
  showMessage:boolean=false;
  eyeIcon=faEye;
  slashEyeIcon=faEyeSlash;
  exclamationIcon=faExclamationCircle;
  rightIcon=faArrowRight;
  typeInputPass: string = 'password';
  loginForm: FormGroup;
  typeInput: string = 'password';
  loading: boolean = false;
  currentLang: string;
  mode = this.modes.username;
  token: any;
  setPasswordForm: any;
  isBtnLoading: boolean=false;
  ValidateEmail:number=0;
  ValidatePassword:number=0;
  nextBtnText: string = "Next";
  message:string="";
  lang; 
  mywindow
  constructor(
    private messageService: MessageService,
    private layoutService:LayoutService,
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private translationService: TranslationService,
    private userService: UserService,
    private router: Router,
    public translate: TranslateService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(params =>{
      console.log(params['code']);
      
      this.authService.getUAEUSER(params['code']).subscribe(res=>{
        console.log(res.token);
        this.userService.setUser(res);
        localStorage.setItem('$AJ$token',res.token)
        localStorage.setItem('UaeLogged','true')
        this.router.navigateByUrl('');
      })
    })
  }

  ngOnInit(): void {
   
     this.initLoginForm();
     this.translationService.handleLanguageChange('ar');
     localStorage.setItem('currentLang', 'ar')
     this.lang = localStorage.getItem('preferredLanguage')

  }

  initLoginForm() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
    })
  }
  get email() {
    return this.loginForm.controls['email'] as FormControl;
  }
  get password() {
    return this.loginForm.controls['password'] as FormControl;
  }
  onNext() {
    // if (this.mode === this.modes.username) {
    //   this.validate()
    //   return
    // }
    // if (this.mode === this.modes.password) {
    //   this.authenticate()
    //   return
    // }
    // if (this.mode === this.modes.setPassword) {
    //   this.setPassword()
    //   return
    // }

    this.login();

  }

  get getLoginForm() {
    return this.loginForm.controls
  }

  // onSubmit(form: FormGroup) {
  //   if (form.valid) {
  //     this.loading = true;
  //     this.authService.login(form.value).subscribe(result => {
  //       this.loading = false;
  //       localStorage.setItem('token', result.token);
  //       this.router.navigate(['/schools']);
  //     }, error => {
  //       this.loading = false;
  //     })
  //   }
  // }

  onSwitchLanguage() {
    // this.translationService.handleLanguageChange()
  }

  initSetPasswordForm() {
    this.setPasswordForm = this.formbuilder.group({
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$')]],
      otp: [null, [Validators.required]],
      passwordConfirmation: [null, [Validators.required, this.matchValues('password'), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$')]],
    })
  }
  get getSetPasswordForm() {
    return this.setPasswordForm.controls
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value !== control.parent.controls[matchTo].value
        ? { isMatching: true }
        : null;
    };
  }

  revalidatePasswordMatch() {
    this.setPasswordForm.controls.password.valueChanges.subscribe(() => {
      this.setPasswordForm.controls.passwordConfirmation.updateValueAndValidity();
    });
  }


  setPassword() {
    if (this.setPasswordForm.valid) {
      this.isBtnLoading = true
      this.authService.setPassword(this.token, this.setPasswordForm.value.password, this.setPasswordForm.value.otp).subscribe((res: any) => {
        this.isBtnLoading = false
        this.userService.setToken(res)
        this.router.navigateByUrl('/dashboard')
      }, err => {
        this.isBtnLoading = false
        // this.toastr.error(err.message[this.lang])
      })
    }
  }

  authenticate() {
   
    this.authService.authenticate(this.token, this.password.value).subscribe((res: any) => {
      this.isBtnLoading = false;
      this.userService.setUser(res.user);
      this.userService.setToken(res);
      this.showSuccess();
      console.log(res.token);
      // this.userService.persist("token",res.token);
      this.router.navigateByUrl('/');
     
 
    },err=>{this.isBtnLoading = false;this.showError()})
  }
  validate() {
   
    this.authService.validateUsername(this.email.value).subscribe((res: any) => {
      this.token = res.token
   
      this.authenticate();

    },err=>{this.isBtnLoading = false;this.showError()})
  }

  login(){

    this.isBtnLoading=true;
    this.validate();

  }


  showSuccess() {
    this.toastr.clear();
  console.log("helo from success")
    this.layoutService.message.next('login.Login Successfully');
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.toastr.success( this.translate.instant(this. message));

  }

  showError() {
    this.toastr.clear();
    this.layoutService.message.next( 'login.Something is wrong,Pleaze login again');
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.toastr.error( this.translate.instant(this. message));
   

  }


  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      // this.authService.login(form.value).subscribe(result => {
      //   this.loading = false;
      //   this.showSuccess();
      //   localStorage.setItem('token', result.token);
      //   this.router.navigate(['/dashboard']);
      // }, error => {
      //   this.loading = false;
      //   this.showError()
      // })
    }
  }

  changeCurrentLang(lang: string) {

    // this.translationService.handleLanguageChange(lang);
    // this.translate.use(lang);
    // localStorage.setItem('currentLang', lang)
  }
  signWithIdentity(){
    this.authService.signInWithIdentity(this.lang).subscribe(res=>{
      window.location.href = res.massege
     
    })
  }



}
