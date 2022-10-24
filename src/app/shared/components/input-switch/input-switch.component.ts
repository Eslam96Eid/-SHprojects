import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
  providers:[
    {
      provide :NG_VALUE_ACCESSOR,
      useExisting: InputSwitchComponent,
      multi: true
    }
  ]
})
export class InputSwitchComponent implements OnInit, ControlValueAccessor {

  @Input('label') label:string 
  @Input('for') for:string 
  
  value= false
  onChange:(value:boolean)=>void

  constructor() { }

  writeValue(obj: any): void {
    console.log(obj);
    this.value
    
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  ngOnInit(): void {
  }

  onChecked(input){
    this.value = input
    this.onChange(this.value)
    // this.value= input

    
  }
}
