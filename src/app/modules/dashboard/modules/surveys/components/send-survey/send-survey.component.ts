import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, SelectItem,PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { ISendSurvey } from 'src/app/core/Models/ISendSurvey';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ParentService } from '../../../parants/services/parent.service';
import { SchoolYearsService } from '../../../school-years/service/school-years.service';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})
export class SendSurveyComponent implements OnInit {
  sendSurvey :ISendSurvey  = <ISendSurvey>{};
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  // userlist: parentsList[];
  selectedUser:'';

  faCheck = faCheck
  faArrowRight = faArrowRight
  faArrowLeft = faArrowLeft
  parentsModelOpened = false
  SendServeyModelOpened = false
  display: boolean = false;
  diseases=[{name:' كمال عادل'},{name:'محمد احمد'},{name:'مارك جمال'},{name:'الوليد احمد'}];
  parenNametList=[];
  guardianIds : number[]= [];
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات ' ,routerLink:'/dashboard/educational-settings/surveys',routerLinkActiveOptions:{exact: true}},
      { label: 'تفاصيل الاستبيان',routerLink:'/dashboard/educational-settings/surveys/survey-details',routerLinkActiveOptions:{exact: true} }],
      mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
  }

  step = 1
  parentsList =[];

  // parentsList = [
  //   {
  //     id: '#1',
  //     firstName: "كمال",
  //     lastName: 'أشرف',
  //   },
  //   {
  //     id: '#2',
  //     firstName: "أشرف",
  //     lastName: 'عماري',
  //   },
  //   {
  //     id: '#3',
  //     firstName: "كمال",
  //     lastName: 'حسن',
  //   },
  //   {
  //     id: '#4',
  //     firstName: "أشرف",
  //     lastName: 'عماري',
  //   },
  //   {
  //     id: '#5',
  //     firstName: "كمال",
  //     lastName: 'أشرف',
  //   },
  //   {
  //     id: '#6',
  //     firstName: "أشرف",
  //     lastName: 'عماري',
  //   },
  // ]
  selectedParents = [
    {
      id: '#813155',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#813155',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#813155',
      firstName: "كمال",
      lastName: 'حسن',
    },

  ]


  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private primengConfig:PrimeNGConfig,
    private fb:FormBuilder,
    private exportService: ExportService,
    private sharedService: SharedService,
    private parentService : ParentService,
    private _router: ActivatedRoute,
    private Surveyservice: SurveyService,
    private toastr: ToastrService,
    private router: Router
  ) {

    }

  ngOnInit(): void {
    this.seachListener()
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('breadcrumb.surveyList'),routerLink:'/dashboard/educational-settings/surveys' ,routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.surveys.sendSurvey')}],
        mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
      }
    );
    this.dropdownList = [
      { item_id: 1, item_text: 'كمال' },
      { item_id: 2, item_text: 'احمد' },
      { item_id: 3, item_text: 'محمود' },
      { item_id: 4, item_text: 'ياسر' },
      { item_id: 5, item_text: 'ماركو' },
      { item_id: 6, item_text: 'كميل' },
      { item_id: 7, item_text: 'جون' },
      { item_id: 8, item_text: 'عبدالرحمن' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'محمود' },
      { item_id: 4, item_text: 'ياسر' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'عدم تحديد الكل',
      itemsShowLimit: 5,
      // allowSeachFilter: true
   }

  }


     // << FORMS >> //
     medicalFileForm= this.fb.group({
      appearanceDate:'',
      disAppearanceDate:'',
      appearanceTime:'',
      disAppearanceTime:'',
      surveyLink:'',
      chronicDiseases: [],

    })
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addParents() {
    debugger
    console.log(this.parenNametList)
    this.parentsModelOpened = false;
    if(this.clearFlag != true){
      this.medicalFileForm.patchValue({
        chronicDiseases: this.parenNametList
      })
    }
    else{
      this.medicalFileForm.patchValue({
        chronicDiseases: []
      })
    }
   
  }

  selectedDate(e) {
    console.log(e);

  }

  openparentsModel() {
    this.parentsModelOpened = true
  }
  openSendServeysModel() {
    this.SendServeyModelOpened = true
  }


  showDialog() {
      this.display = true;
  }
  showFilterModel=false
  searchInput = new FormControl('')
  curriculums$ = this.sharedService.getAllCurriculum();
   schools$ :any ;
  filtration :Filter = {...Filtration , curricuulumId:'' , SchoolId:''}
  onExport(fileType: FileEnum, table:Table){
   // this.exportService.exportFile(fileType, table, this.schools.list)
  }
  clearFlag = false
  clearFilter(){
    this.showFilterModel = false;
    this.filtration.KeyWord ='';
    this.filtration.curricuulumId = null;
    this.filtration.SchoolId = null;
    this.parentsList = null;
    this.clearFlag =true;
  }
  onFilterActivated(){
    this.showFilterModel=!this.showFilterModel;
    //this.getParentList();

  }
  ngUnSubscribe =new Subject()
  seachListener(){
    this.searchInput.valueChanges
    .pipe(
      debounceTime(1200),
      distinctUntilChanged(),
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe(val =>{
      // this.onSearch.emit(val);
    })
  }

  getSchoolBycurriculumId(event){
    debugger;
    console.log(event);
    this.schools$ =  this.sharedService.getSchoolsByCurriculumId(event.value);
  }
  // getParentList() {
	// 	this.parentService.getAllParents().subscribe(res => {
  //     this.parentsList = res.data})
	//   }
    getParentBySchoolId(event){
      this.parentService.getParentBySchoolId(event.value).subscribe(res => {
        this.parentsList = res.data})
    }
    AddToTextArea(p){
      this.parenNametList.push({name : p.name.ar});
      this.guardianIds.push(p.id);
    }
     getDate(date: any): string{
      const _date = new Date(date);
      return `${_date.getFullYear()}-${_date.getMonth()}-${_date.getDate()}`;      
    };

    getTime(date: any): string{
      const _date = new Date(date);
      _date.getHours() + ':' + _date.getMinutes()
      return `${_date.getHours() + ':' + _date.getMinutes()}`;      
    };

    SendSurvey(){
      this.sendSurvey.guardianIds=[];
      this.sendSurvey.appearanceDate = this.getDate(this.medicalFileForm.value.appearanceDate) ;
      this.sendSurvey.disAppearanceDate =this.getDate(this.medicalFileForm.value.disAppearanceDate);
      this.sendSurvey.appearanceTime =this.getTime(this.medicalFileForm.value.appearanceTime);
      this.sendSurvey.disAppearanceTime =this.getTime(this.medicalFileForm.value.disAppearanceTime); 
      this.sendSurvey.surveyLink = 'string';
      this.sendSurvey.surveyId = Number(this._router.snapshot.paramMap.get('surveyId'));
      this.guardianIds.forEach((ele)=>{
        this.sendSurvey.guardianIds.push(ele);
      })
      console.log(this.sendSurvey);
      this.Surveyservice.SendSurvey(this.sendSurvey).subscribe(response=>{
        this.toastr.success('send Successfully', '');
        this.router.navigateByUrl('/dashboard/educational-settings/surveys');
        console.log(response);
      })
      //this.showDialog();

    }
}
