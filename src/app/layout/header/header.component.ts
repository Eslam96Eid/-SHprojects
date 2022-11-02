import { Component, EventEmitter, HostListener, NgZone, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, fromEvent } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

import { UserService } from 'src/app/core/services/user/user.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { slide } from 'src/app/shared/animation/animation';
import { DashboardPanalEnums } from 'src/app/shared/enums/dashboard-panal/dashboard-panal.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { LayoutService } from '../services/layout/layout.service';

interface MenuItem{
  id:number
  title:string
  enum: DashboardPanalEnums,
  links:{}[]
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[slide]
})
export class HeaderComponent implements OnInit {
  paddingStyle:string="2rem";
  paddingTopStyle:string="2rem";
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  isInDashboard;
  message:string="";
  faAngleDown = faAngleDown
  faArrowLeft = faArrowLeft

  classes={
    // 'on-scroll': false
  }

  activeRoute$=this.routeListenrService.activeRoute$

  isMenuOpend= false
  activeMenuItem:MenuItem
  activeMenuItemChanged =false

  menuItems: MenuItem[] =[
    {

      id:1,
      enum: DashboardPanalEnums.SCHOOLS_AND_STUDENTS,
      title:'مدارس وطلاب',
      links:[
        {name: 'المدارس',url:'/dashboard/schools-and-students/schools'},
        {name: 'الطلاب', url:'/dashboard/schools-and-students/students'},
        {name: 'اولياء الامور',url:'/dashboard/schools-and-students/all-parents'},
      ]
    },
    {
      id:2,
      enum: DashboardPanalEnums.PEFORMANCE_MANAGMENT,
      title:'اداره الاداء',
      links:[
        {name: 'الامتحانات',url:'/dashboard/performance-managment/assignments/assignments-list'},
        {name: 'قائمه الطلبات',url:'/dashboard/performance-managment/RequestList/Request-List'},

      ]
    },
    {
      id:3,
      enum: DashboardPanalEnums.MANAGAR_TOOLS,
      title:'ادوات مدير النظام',
      links:[
        {name: 'المستخدمين',url:'/dashboard/manager-tools/user-information/users-list'},
        {name: 'الادوار الوظيفيه', url:'/dashboard/manager-tools/user-roles/user-roles-list'},
        {name: 'اعدادات النظام ',url:'/dashboard/managerTools/'},
        {name: 'قواءم النظام',url:'/dashboard/manager-tools/indexes/indexes-list'},
      ]
    },
    {
      id:4,
      enum: DashboardPanalEnums.REPORTS_MANAGEMENT,
      title:'اداره التقارير',
      links:[
        {name: 'تقرير الطلاب',url:'/dashboard/reports-managment/students-reports'},
        {name: 'تقرير اولياء الامور', url:'/dashboard/reports-managment/'},
        {name: 'تقرير الغياب والحضور',url:'/dashboard/reports-managment/'},
        {name: 'تقرير المدارس',url:'/dashboard/reports-managment/'},
        {name: 'تقرير الدرجات', url:'/dashboard/reports-managment/degrees-reports'},
        {name: 'تقرير الموظفين',url:'/dashboard/reports-managment/'},
        {name: 'تقرير المعلمين',url:'/dashboard/reports-managment/'},
        {name: 'تقرير المواد الدراسيه', url:'/dashboard/reports-managment/'},
      ]
    },
    {
      id:5,
      enum: DashboardPanalEnums.EDUCATIONAL_SETTING,
      title:'الاعدادات التعليميه',
      links:[
        {name: 'الاجازه السنويه',url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list'},
        {name: 'السنوات الدراسيه', url:'/dashboard/educational-settings/school-year/school-years-list'},
        {name: 'المواد الدراسيه',url:'/dashboard/educational-settings/subject/subjects-list'},
        {name: 'قائمه الاستبيانات', url:'/dashboard/educational-settings/surveys'},
        {name: 'تقيمات المواد الدراسيه',url:'/dashboard/educational-settings/assessments/assements-list'},
      ]
    },
  ]

  notificationsList=[]
  checkLanguage:boolean = false
  isChecked:boolean = false
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 2,
    "isRead": null
  }

  constructor(
    private toastr:ToastrService,
    private router: Router,
    private translate:TranslateService,
    private userService: UserService,
    private routeListenrService:RouteListenrService,
    private zone: NgZone,
    private layoutService:LayoutService,
    private notificationService: NotificationService
    ) { }


  ngOnInit(): void {


    // if(this.router.url.indexOf('dashboard') > -1) this.isInDashboard = true

    // this.router.events
    // .pipe(filter( event =>event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {

    //   if(event.url.indexOf('dashboard') > -1){
    //     this.isInDashboard = true
    //   }
    // })
    if(localStorage.getItem('$AJ$token')){
    this.getNotifications(this.searchModel)
    }else{
      return
    }
    if(localStorage.getItem('preferredLanguage')=='ar'){
      this.checkLanguage = true
    }else{
      this.checkLanguage = false
    }
    this.setupScrollListener()
  }


  getNotifications(searchModel){
    this.notificationService.getAllNotifications(searchModel).subscribe(res=>{
      this.notificationsList = res.data
    })
  }
  getNotReadable()
  {
    this.searchModel.keyword = null
    this.searchModel.page = 1
    this.searchModel.pageSize = 2
    this.searchModel.isRead = false
    this.getNotifications(this.searchModel)
  }
  getReadable()
  {
    this.searchModel.keyword = null
    this.searchModel.page = 1
    this.searchModel.pageSize = 2
    this.searchModel.isRead = true
    this.getNotifications(this.searchModel)
  }

  private setupScrollListener() {

    this.zone.runOutsideAngular(() => {

      fromEvent(window, "scroll").subscribe((e:any) => {

        if (e.target.scrollingElement.scrollTop <= 1) {

          this.zone.run(() => this.classes['on-scroll'] =false);

        }else if(e.target.scrollingElement.scrollTop > 1 && e.target.scrollingElement.scrollTop < 7){

          this.zone.run(() => this.classes['on-scroll'] =true);
        }

      });

    })

  }

  logout() {
    this.userService.clear();
  }

  onSwitchLanguage() {
    // this.translationService.handleLanguageChange()

  }


  openMenu(index){

    if(this.activeMenuItem && this.activeMenuItem?.id == index + 1){

       this.isMenuOpend = !this.isMenuOpend
      this.activeMenuItemChanged = true

    } else{
      this.activeMenuItemChanged = false
      this.activeMenuItem = this.menuItems[index];
      this.isMenuOpend = true

      setTimeout(()=>{
        this.activeMenuItemChanged = true
      },320)
    }
    this.activeMenuItem = this.menuItems[index];
    // this.activeMenuItemChanged = true

  }

  atclickOutside(){
    this.isMenuOpend = false
  }

  onDateSelected(e){
    console.log(e);

  }

  changeStatus(value){
    if(value=='0'){
      this.isChecked= false
      this.getNotifications(this.searchModel = {
        "keyword": null,
        "sortBy": null,
        "page": 1,
        "pageSize": 2,
        "isRead": null
      })
    }
    if(value=='1'){
      this.isChecked= false
      this.getReadable()
    }
    if(value=='2'){
      this.isChecked= true
      this.getNotReadable()
    }
}
goToNotificationDetails(pageLink){
  this.router.navigate([pageLink])
}

markAsRead(){
  let sentData = {
    'NotificationId' : []
  }
  this.notificationsList.map((res)=>{
    {
      return sentData.NotificationId.push(res.id)
    }
  })

  this.notificationService.updateNotifications(sentData).subscribe(res=>{
    this.toastr.success(res.message)
    this.getNotReadable()
  },err=>{
    this.toastr.error(err.message)
  })
}
}
