import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';
  constructor(private http: HttpHandlerService, private router: Router) { }

  // login(user: any) {
  //   return this.http.post<{ token: string }>(this.MAIN_LINK, user);
  // }

  // // isLoggedIn() {
  // //   const helper = new JwtHelperService();
  // //   const token = localStorage.getItem('token');


  // //   if (!token)
  // //     return false;

  // //   return true
  // // }

  getToken() {
    return localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
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
    return this.http.get("/Account/Agent/GetMyProfile")
  }

  updateProfile(updatedUser: any) {
    return this.http.put("/Account/Agent/Update", updatedUser)
  }

  forgotPassword(username: any) {
    return this.http.post("/User/ForgotPassword", { username })
  }

  resetPassword(passwords: any) {
    return this.http.post("/User/ResetPassword", passwords)
  }
  signInWithIdentity(lang){
    return this.http.get("/Account/UAEPASS",lang)
  }
  getUAEUSER(code){
    return this.http.get(`/Account/UAEPASS/GetToken?authenticationCode=${code}`)
  }
}
