import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValidatorsInput]'
})
export class ValidatorsInputDirective {

  @Input() appValidatorsInput:boolean;

  constructor(public el:ElementRef) { 
    this.el.nativeElement.style.borderRadius="15px";

  }
  @HostListener('click') onClick(){
   
    this.el.nativeElement.style.boxShadow="inset 0 0 0 1px #3f51b5, inset 0 0 0 1px #3f51b5, inset 0 0 0 1px #3f51b5, inset 0 0 0 1px #3f51b5";
    
    this.el.nativeElement.style.height='60px';
  
}

}
