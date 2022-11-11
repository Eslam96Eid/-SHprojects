import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-student',
  templateUrl: './card-student.component.html',
  styleUrls: ['./card-student.component.scss']
})
export class CardStudentComponent implements OnInit {

  @Input() student : any
  @Output() addStudent = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
 
  increaseOrDecrease(event){
      this.addStudent.emit(event.target.checked)
  }

}
