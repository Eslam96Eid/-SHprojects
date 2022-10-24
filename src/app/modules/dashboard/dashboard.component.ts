import { Component, OnInit } from '@angular/core';

import { routeSlide } from 'src/app/shared/animation/animation';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations:[
    routeSlide
  ]
})
export class DashboardComponent implements OnInit {
hideBackGroundImage:boolean=false;
  constructor(   private router:Router, private routeListenrService:RouteListenrService) { }

  ngOnInit(): void {
    // let url = this.router.url
    // this.routeListenrService.initRouteListner(url)

    this.router.events
    .pipe(
      filter(event =>event instanceof NavigationEnd ),
      )
    .subscribe((event: NavigationEnd) => {event.url=='/dashboard/schools-and-students/all-parents/parent/123/all-children/child/331' ? this.hideBackGroundImage = true : this.hideBackGroundImage = false;})
  }
  

routChange = true
  onActive($event, outlet){
 
    
     this.routChange =true
     
  }

  prepareRoute(outlet){
    return outlet && outlet.activatedRouteData
  }

}
