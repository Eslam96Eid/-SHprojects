import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModelService {

  isOpend$ = new BehaviorSubject(false)
  confirmed$ = new BehaviorSubject(null)


  constructor() { }

  openModel(){
    this.isOpend$.next(true)
  }

  closeModel(){
    this.isOpend$.next(false)
  }
}
