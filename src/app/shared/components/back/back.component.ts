import { LocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent implements OnInit {

  @Input('route') routeUrl=''

  faArrowRight=faArrowRight

  constructor(private location: LocationStrategy, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  getBack(): void{
    if(this.routeUrl){
      this.router.navigate([this.routeUrl],{relativeTo:this.route});
      return
    }
    this.location.back();
  }

}
