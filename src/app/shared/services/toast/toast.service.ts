import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return this.toastr.show(message, title, override, type);
  }

  success(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.success(message, title, override);
  }

  error(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.error(message, title, override);
  }

  info(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.info(message, title, override);
  }

  warning(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.warning(message, title, override);
  }
}
