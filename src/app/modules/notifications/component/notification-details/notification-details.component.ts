import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { INotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit {
  notificationsList: INotification[] = [];
  currentNotificationId: number = 0;
  currentNotification: INotification = {} as INotification;
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('breadcrumb.Notifications'), routerLink: '/notifications/notifications-list' ,routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('Notifications.Notification details') }

    ],
    mainTitle: { main: this.translate.instant('Notifications.Notification details') },
    showNotificationActionBtn: true
  };


  constructor(private headerService: HeaderService, private activatedRoute: ActivatedRoute, private translate: TranslateService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    // this.notificationService.notificationsList.subscribe((res)=>{ this.notificationsList=res;});

    this.activatedRoute.paramMap.subscribe(param => {
      this.currentNotificationId = Number(param.get('notificationId'));
      this.notificationsList.forEach(element => {
        if (element.id == this.currentNotificationId) { this.currentNotification = element; }
      });
    });





  }

}
