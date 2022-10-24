import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';



@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input('items') items:MenuItem[]
  @Output() onItemClicked = new EventEmitter()


  faEllipsisVertical=faEllipsisVertical


  constructor() { }

  ngOnInit(): void {
  }

  onClick(index){
    this.onItemClicked.emit(index);
  }
}
