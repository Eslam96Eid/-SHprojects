import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
/* tslint:disable */
declare var Object: any;
import { Injectable, Inject, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IAccount } from 'src/app/modules/dashboard/modules/user-information/models/IAccount';
import { IAccountAddOrEdit } from 'src/app/modules/dashboard/modules/user-information/models/IAccountAddOrEdit';
import { environment } from 'src/environments/environment';
import { IUser, Token } from '../../Models/base.models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();


  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];

  selectedCities: string[];
  usersList: IUser[] = [];
  constructor(private router: Router ,private http: HttpClient
) {
  this.headers = this.headers.set('content-type', 'application/json');
  this.headers = this.headers.set('Accept', 'application/json');
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.expires = this.load('expires');
    this.token.token = this.load('token');
    this.token.claims = this.load('claims');
    this.usersList = [
      { 'id': 12354777789745, 'fullName': 'محمد علي', 'phoneNumber': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'أحمد طارق', 'phoneNumber': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'lastUpdated': 'Male', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'عمرو صلاح', 'phoneNumber': '(478) 7181722', 'email': 'aelldred2@archive.org', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'عباس مصطفي', 'phoneNumber': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'lastUpdated': 'Female', 'privateRole': 'مهندس كمبيوتر', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'ناهد محمد', 'phoneNumber': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'lastUpdated': 'Male', 'privateRole': 'مهندس كمبيوتر', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'رياض علي', 'phoneNumber': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'lastUpdated': 'Male', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'أيهاب فوزي', 'phoneNumber': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'lastUpdated': 'Male', 'privateRole': 'مهندس كمبيوتر', 'nickName': "", 'userStatus':"فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'مححمود احمد', 'phoneNumber': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'lastUpdated': 'Male', 'privateRole': 'مساعد مدير', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'أياد محمد', 'phoneNumber': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus':"غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'مني علي', 'phoneNumber': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'طه محمود', 'phoneNumber': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'lastUpdated': 'Female', 'privateRole': 'مساعد مدير', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777897452, 'fullName': 'علي مصطفي', 'phoneNumber': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'داليا مصطفي', 'phoneNumber': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'lastUpdated': 'Female', 'privateRole': 'مساعد مدير', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'طارق شوقي', 'phoneNumber': '(416) 4076124', 'email': 'adriversd@com.com', 'lastUpdated': 'Male', 'privateRole': 'مساعد مدير', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'محمد محمود', 'phoneNumber': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'lastUpdated': 'Female', 'privateRole': 'مساعد مدير', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'إيمان علي', 'phoneNumber': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'lastUpdated': 'Female', 'privateRole': 'مساعد مدير', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'ناديه محمد', 'phoneNumber': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'lastUpdated': 'Male', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'صادق عبد الرحمن', 'phoneNumber': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'lastUpdated': 'Male', 'privateRole': 'مهندس كمبيوتر', 'nickName': "", 'userStatus': "فعال", 'password': "", 'identityNumber': "" },
      { 'id': 12354777789745, 'fullName': 'سلوي ابراهيم', 'phoneNumber': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus':"فعال", 'password': "", 'identityNumber': "" },
      { 'id': 21235477789745, 'fullName': 'مراد ممدوح', 'phoneNumber': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'lastUpdated': 'Female', 'privateRole': 'مدرس', 'nickName': "", 'userStatus': "غير فعال", 'password': "", 'identityNumber': "" }

    ];



    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];

  }
  _headers = new HttpHeaders({
    'Accept': ' */*',
    'content-type': 'application/json-patch+json'

});
  getUsersList(keyword:string ,sortby:string ,page :number , pagesize :number): Observable<any>{

    let body= {keyword:keyword.toString() ,sortBy: sortby.toString() ,page:Number(page) , pageSize:Number(pagesize)}
console.log(body)
    return this.http.post<any>(`${this.baseUrl+'/Account/Search'}`,body ,{observe:'body',headers:this._headers }).pipe(
      map(response => {
         return response ;
      })
    )
  }

  getUsersById(id:number): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.baseUrl+'/Account/Get/'+id}`);
  }

  AddAccount(data: IAccountAddOrEdit): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Account/Add`, data);
  }
  EditAccount(data: IAccountAddOrEdit): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Account/Update`, data);
  }
  GetRoleList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + `/Role/List`);
  }
  GetRoleById(id:number): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.baseUrl+'/Role/Get/'+id}`);
  }


  /**
   * This method will update the user information and persist it
   **/
  public setUser(user: any) {
    this.token.user = JSON.stringify(user);
    this.save();
  }

  /**
   * This method will update the user claims and persist it
   **/
  public setClaims(claims?: any) {
    this.token.claims = JSON.stringify(claims);
    this.save();
  }

  /**
   * @method setToken
   * @param {Token} token Token or casted AccessToken instance
   * @return {void}
   * @description
   * This method will set a flag in order to remember the current credentials
   **/
  public setToken(token: Token): void {
    this.token = Object.assign({}, this.token, token);
    this.save();
  }

  /**
   * @method getToken
   * @return {void}
   * @description
   * This method will set a flag in order to remember the current credentials.
   **/
  public getToken(): Token {
    return <Token>this.token;
  }

  /**
   * @method getAccessTokenId
   * @return {string}
   * @description
   * This method will return the actual token string, not the object instance.
   **/
  public getAccessTokenId(): string {
    return this.token.token;
  }

  public isAuthenticated(): string {
    return this.token.token && this.token.userId;
  }

  /**
   * @method getCurrentUserId
   * @return {any}
   * @description
   * This method will return the current user id, it can be number or string.
  **/

  public getCurrentUserId(): any {
    return this.token.userId;
  }

  /**
   * @method getCurrentUserData
   * @return {any}
   * @description
   * This method will return the current user instance.
   **/
  public getCurrentUserData(): IUser {
    return typeof this.token.user === 'string' ? JSON.parse(this.token.user) : this.token.user;
  }

  public getCurrentUserClaims(): any {
    return typeof this.token.claims === 'string' ? JSON.parse(this.token.claims) : this.token.claims;
  }
  public  isUserLogged():boolean
  {
    if (this.load("token"))
       {return true;}
    else
       {return false;}
  }

  public isUserAllowedTo(claim: string): any {

    let userClaims = this.getCurrentUserClaims() || [];

    return userClaims.indexOf(claim) >= 0;
  }

  /**
   * @method save
   * @return {boolean} Whether or not the information was saved
   * @description
   * This method will save in either local storage or cookies the current credentials.
   **/
  public save(): boolean {
    let expires = new Date(this.token.expires);
    this.persist('token', this.token.token, expires);
    this.persist('user', this.token.user, expires);
    this.persist('userId', this.token.userId, expires);
    this.persist('expires', this.token.expires, expires);
    this.persist('claims', this.token.claims, expires);

    return true;
  }

  /**
   * @method load
   * @param {string} prop Property name
   * @return {any} Any information persisted in storage
   * @description
   * This method will load either from local storage or cookies the provided property.
   **/
  public load(prop: string) {
    return localStorage.getItem(`${this.prefix}${prop}`);
  }

  /**
   * @method clear
   * @return {void}
   * @description
   * This method will clear cookies or the local storage.
   **/
  public clear(): void {
    Object.keys(this.token).forEach((prop: string) => localStorage.removeItem(`${this.prefix}${prop}`));
    this.token = new Token();
    this.token.user = null;
  }

  /**
   * @method persist
   * @return {void}
   * @description
   * This method saves values to storage
   **/
  public persist(prop: string, value: any, expires?: Date): void {
    try {
      if (value)
        localStorage.setItem(`${this.prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value);
    } catch (err) {
      console.error('Cannot access local/session storage:', err);
    }
  }
}
