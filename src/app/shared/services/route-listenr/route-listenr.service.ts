import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, Subject } from 'rxjs';
import { DashboardPanalEnums } from '../../enums/dashboard-panal/dashboard-panal.enum';

@Injectable({
  providedIn: 'root'
})
export class RouteListenrService {

  private activeRoute = new BehaviorSubject<DashboardPanalEnums>(DashboardPanalEnums.SCHOOLS_AND_STUDENTS)
  activeRoute$ = this.activeRoute.asObservable()

  constructor(private router:Router, private translate:TranslateService) { }

  ngOnInit(): void {
    
    let url = this.router.url
    this.initRouteListner(url)
  }


  initRouteListner(url? : string){
    if(url) this.checkRouteInclude(url)
    window.scrollTo(0, 0);

    this.router.events
    .pipe(filter( event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => this.checkRouteInclude(event.url) )

  }

  
  checkRouteInclude(url: string){

    if(url.indexOf('schools-and-students') > -1){        
      this.activeRoute.next(DashboardPanalEnums.SCHOOLS_AND_STUDENTS)

    } else if(url.indexOf('performance-managment') > -1){
      this.activeRoute.next(DashboardPanalEnums.PEFORMANCE_MANAGMENT)

    }else if(url.indexOf('educational-settings') > -1){
      this.activeRoute.next(DashboardPanalEnums.EDUCATIONAL_SETTING)

    }else if(url.indexOf('manager-tools') > -1){
      this.activeRoute.next(DashboardPanalEnums.MANAGAR_TOOLS)

    }else if(url.indexOf('reports-managment') > -1){
      this.activeRoute.next(DashboardPanalEnums.REPORTS_MANAGEMENT)
      
    }else if(url.indexOf('communication-managment') > -1){
      this.activeRoute.next(DashboardPanalEnums.COMMUNICATION_MANAGMENT)

    }else if(url.indexOf('school-info') > -1){
      this.activeRoute.next(DashboardPanalEnums.SCHOOL_INFO)

    }
  }
}
