import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accept-information',
  templateUrl: './accept-information.component.html',
  styleUrls: ['./accept-information.component.scss']
})
export class AcceptInformationComponent implements OnInit {
  @Input('mode') mode : 'edit'| 'view'= 'view'
  constructor() { }

  ngOnInit(): void {
  }

}
