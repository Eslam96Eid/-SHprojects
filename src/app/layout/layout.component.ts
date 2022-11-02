import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { routeSlide } from '../shared/animation/animation';
import { LayoutService } from './services/layout/layout.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})
export class LayoutComponent implements OnInit {
  sideBarOpen = true;
  currentLang: string;
  bgColor$ = this.layoutService.bgColor$



  constructor(public translate: TranslateService, private layoutService:LayoutService) {
    this.currentLang = localStorage.getItem('currentLang') || 'ar'
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {
    
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang)
  }

  prepareRoute(outlet){
    return outlet && outlet.activatedRouteData
  }

}
