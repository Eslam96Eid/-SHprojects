import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmModelService } from '../../services/confirm-model/confirm-model.service';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.scss']
})
export class ConfirmModelComponent implements OnInit {
  isOpend

  constructor(public confirmModelService: ConfirmModelService) { }

  ngOnInit(): void {

    this.confirmModelService.isOpend$.subscribe(val => this.isOpend = val)
  }

  confirm(){
    this.confirmModelService.confirmed$.next(true)
    this.confirmModelService.closeModel()
  }

}
