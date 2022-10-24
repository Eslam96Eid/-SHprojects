import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserEmailSourrce = new BehaviorSubject<any>('');
  currentUserEmail = this.currentUserEmailSourrce.asObservable();

  private sidebarCountsSource = new BehaviorSubject<any>({});
  sidebarCounts = this.sidebarCountsSource.asObservable();

  private accountingPeriodSource = new ReplaySubject<any>();
  accountingPeriod = this.accountingPeriodSource.asObservable();

  constructor(private http: HttpHandlerService,
    private userService: UserService) {
  }

  validateUsername(userName: string) {
    return this.http.post("/User/Auth/Validate", { userName })
  }

  authenticate(token: string, password: string) {
    return this.http.post("/User/Auth/Authenticate", { password }, null, { Authorization: `Bearer ${token}` })
  }

  setPassword(token: string, password: string, otp: string) {
    return this.http.post("/Account/Auth/SetPassword", { password, otp }, null, { Authorization: `Bearer ${token}` })
  }

  getMyProfile() {
    return this.http.get("/User/GetMyProfile")
  }

  updateProfile(updatedUser) {
    return this.http.put("/Account/Update", updatedUser)
  }

  forgotPassword(username) {
    return this.http.post("/User/ForgotPassword", { username })
  }

  resetPassword(passwords) {
    return this.http.post("/User/ResetPassword", passwords)
  }

  // logout() {
  //   return this.http.post("/User/Token/Revoke", this.userService.getToken().token)
  // }

  saveCurrentUserEmail(email?) {
    this.currentUserEmailSourrce.next(email)
    return this.currentUserEmail
  }




}
