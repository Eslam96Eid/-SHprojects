import { MenuItem } from "primeng/api";

export interface IHeader {
    breadCrump: MenuItem[];
    mainTitle?: ITitle;
    subTitle?: ITitle;
    showNoOfNotifications?:boolean;
    showNotificationActionBtn?:boolean;
    showNoOfMessages?:boolean;

}

export interface ITitle{
    main:string
    sub?:any
}



