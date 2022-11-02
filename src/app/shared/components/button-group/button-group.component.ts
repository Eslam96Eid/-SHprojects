import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  @Input() items
  @Output() onCkick =new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    this.setActive(0)
  }

  setActive(index){
    this.resetActive()
    this.items[index].active= true
    this.onCkick.emit(this.items[index].value)
  }

  resetActive(){
    this.items.forEach(el => {
      el.active =false
    });
  }
}
