import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsEnum } from '../../enums/permissions/permissions.enum';

@Directive({
  selector: '[permit]'
})
export class PermissionDirective implements OnChanges {
  clams={
    [PermissionsEnum.NURSE] : PermissionsEnum.NURSE, 
    // [PermissionsEnum.S_EMPLOYEE] : PermissionsEnum.S_EMPLOYEE
  }
  

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  @Output('currentStep') currentStep = new EventEmitter<number>()
  @Input() step

  @Input()
  set permit(val) {
    // IN CASE ARRAY OF PERMISSIONS
  
    
    if (val instanceof Array) {
      
      if(val.some(item=> this.clams?.[item])){
          this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else
        this.viewContainer.clear();
    }
    // IN CASE ONE PERMISSION
    else {
      if(this.clams?.[val]) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }

  }

}
