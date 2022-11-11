import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
/* tslint:disable */
declare var Object: any;
import { Injectable, Inject, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

import { environment } from 'src/environments/environment';
import { IUser, Token } from '../../Models/base.models';
import { Filter } from '../../models/filter/filter';
import { IAccount } from '../../Models/IAccount';
import { IAccountAddOrEdit } from '../../Models/IAccountAddOrEdit';


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
  constructor(private router: Router ,private http: HttpClient,private tableLoaderService: LoaderService
) {
  this.headers = this.headers.set('content-type', 'application/json');
  this.headers = this.headers.set('Accept', 'application/json');
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.expires = this.load('expires');
    this.token.token = this.load('token');
    this.token.claims = this.load('claims');




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

getUsersList(filter?:Partial<Filter>){

  this.tableLoaderService.isLoading$.next(true)
  let params = new HttpParams();
  if (filter.SortColumn)
    params = params.append('SortColumn', filter.SortColumn);
  if (filter.SortDirection)
    params = params.append('SortDirection', filter.SortDirection);
  if (filter.KeyWord)
    params = params.append('KeyWord', filter.KeyWord);
  if (filter.SortBy)
    params = params.append('SortBy', filter.SortBy);
  if (filter.isactive != null)
    params = params.append('isactive', filter.isactive);
  if (filter.roleId != null)
    params = params.append('roleId', filter.roleId);
  return this.http.get<any>(`${this.baseUrl}` + '/Account/Search' , {observe:'response' , params}).pipe(
    map(response => {
       return response.body ;
    })
  )

  // return this.http.get('/Account/Search',filter)
  // .pipe(
  //   take(1),
  //   finalize(()=> {
  //     this.tableLoaderService.isLoading$.next(false)
  //   }))
}
//   getUsersList(keyword:string ,sortby:string ,page :number , pagesize :number): Observable<any>{

//     let body= {keyword:keyword.toString() ,sortBy: sortby.toString() ,page:Number(page) , pageSize:Number(pagesize)}
// console.log(body)
//     return this.http.post<any>(`${this.baseUrl+'/Account/Search'}`,body ,{observe:'body',headers:this._headers }).pipe(
//       map(response => {
//          return response ;
//       })
//     )
//   }
  getUsersListByRoled(roleId?:number , isactive? : boolean  , keyword?:string ,sortby?:string ,page? :number , pagesize? :number): Observable<any>{

    let body= {keyword:keyword.toString() ,sortBy: sortby.toString() ,page:Number(page) , pageSize:Number(pagesize)}

if(roleId == null && isactive != null){
  return this.http.post(`${this.baseUrl+'/Account/Search?isactive='+isactive}`,body ,{observe:'body',headers:this._headers }).pipe(
    map(response => {
       return response ;
    })
  )
}
if(roleId != null && isactive == null){
  return this.http.post(`${this.baseUrl+'/Account/Search?roleId='+roleId}`,body ,{observe:'body',headers:this._headers }).pipe(
    map(response => {
       return response ;
    })
  )
}
else{
  return this.http.post(`${this.baseUrl+'/Account/Search?roleId='+roleId+'&isactive='+isactive}`,body ,{observe:'body',headers:this._headers }).pipe(
    map(response => {
       return response ;
    })
  )
}
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
    return this.http.get<any>(`${this.baseUrl}` + `/role-details/dropdown`);
  }
  GetRoleById(id:number): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.baseUrl+'/role-details/'+id}`);
  }

       public setScope(scope?: any) {
        this.token.scope = JSON.stringify(scope);
        this.save();
      }

  public getCurrentUserScope(): any {

    return typeof this.token.scope === 'string' ?  JSON.parse(this.token.scope)  : this.token.scope;

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
