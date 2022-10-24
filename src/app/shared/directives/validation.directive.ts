import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective  {

  @Input() appValidation:boolean;

  constructor(public el: ElementRef) { 
    this.el.nativeElement.style.padding="0.15rem 0.15rem";
    this.el.nativeElement.style.borderRadius="15px";
    
  
  }
 
  @HostListener('click') onClick(){
   
      this.el.nativeElement.style.boxShadow="inset 0 0 0 1px #3f51b5, inset 0 0 0 1px #3f51b5, inset 0 0 0 1px #3f51b5, inset 0 0 0 1px #3f51b5";
      
    
  }
 


}
