import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterChildService {

  onEditMode$= new BehaviorSubject(false)
  submitBtnClicked$ = new BehaviorSubject(false)
  Student$ = new BehaviorSubject<Student>(null)
  constructor() { }
}
