import { Directive, inject, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from '../../enums/user/user.enum';

@Directive({
  selector: '[ScopePermit]'
})
export class ScopePermitDirective {

  currentUserScope = [inject(UserService).getCurrentUserScope()]
  get ScopeEnum() { return UserScope}
  // clams={
  //   [PermissionsEnum.NURSE] : PermissionsEnum.NURSE, 
  //   [PermissionsEnum.S_EMPLOYEE] : PermissionsEnum.S_EMPLOYEE
  // }
  

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
  }


  @Input()
  set permit(val) {
    // IN CASE ARRAY OF PERMISSIONS
  
    
    if (val instanceof Array) {
      
      if(val.some(item=> this.currentUserScope?.[item])){
          this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else
        this.viewContainer.clear();
    }
    // IN CASE ONE PERMISSION
    else {
      if(this.currentUserScope?.[val]) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }

  }

}
