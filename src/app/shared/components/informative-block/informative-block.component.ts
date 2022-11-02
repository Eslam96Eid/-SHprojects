import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informative-block',
  templateUrl: './informative-block.component.html',
  styleUrls: ['./informative-block.component.scss']
})
export class InformativeBlockComponent implements OnInit {

  @Input() title:string;
  @Input() subTitle:string;
  @Input() src:string;
  @Input('size') small:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
