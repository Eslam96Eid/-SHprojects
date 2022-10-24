/* tslint:disable */

declare var Object: any;


export interface AccessTokenInterface {
  token: string;
  expires: string;
  userId: string;
  user: any;
  claims: any;
}

export interface IUser {
  id: number;
  source?: string;
  username?: string;
  fullName: any;
  email: string;
  phoneNumber: string;
  lastUpdated: string;
  userStatus:string;
  identityNumber:string;
  password:string;
  nickName:string;
  privateRole:string;
}

// export interface MenuItem {
//   categoryTitle: string;
//   order: number;
//   title: string;
//   icon: string;
//   routerLink: string;
//   claims: any;
//   realm?: any;
// }


export interface Complexity {
  level: string;
  label: string;
}

export class Token implements AccessTokenInterface {
  token: string = null;
  expires: string = null;
  userId: string = null;
  user: any = null;
  claims: any = null;
  centerId: string = null;
  centerLogoUrl: string = null
  constructor(data?: AccessTokenInterface) {
    Object.assign(this, data);
  }
}
