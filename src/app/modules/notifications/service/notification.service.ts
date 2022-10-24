import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from 'src/app/core/Models/inotification';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpHandlerService) { }
  
  getAllNotifications(searchModel){
    return this.http.get('/Notification',searchModel)
  }

  updateNotifications(searchModel){
    return this.http.patch('/Notification/isread',searchModel)
  }
}
