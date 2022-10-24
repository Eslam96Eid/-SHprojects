import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unregister-child',
  templateUrl: './unregister-child.component.html',
  styleUrls: ['./unregister-child.component.scss']
})
export class UnregisterChildComponent implements OnInit {


  step=1

  student =
  {
    name: 'محمد على',
    age: 15,
    regestered: true,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school: 'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation: 'ابن الاخ',
    src: 'assets/images/avatar.png'
  }


  
  constructor() { }

  ngOnInit(): void {
  }

}
