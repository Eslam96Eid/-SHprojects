import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  @Input() shape: 'circle' | 'rectangle' ='rectangle'
  @Input() width: string = '100%'
  @Input() height: string = '4rem'
  @Input() size: string

  @Input('c')  set countNum(val){
    let arr=[]
    for(let i=1; i<=val; i++) { arr.push(i) }
    this.countArr =arr
  }
  @Input('style') set styles(val){
    this.style={...val}
  }
  @Input() borderRadius: string ='15px'

  countArr=[1]
  style

  constructor() { }

  ngOnInit(): void {
    
  }

}
