import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http:HttpHandlerService) { }

  uploadMedia(file, type){
    return this.http.post(`/Upload/Upload-blobstorage?type=${type}`, file,{}, {'content-type': 'attachment'}).pipe(take(1))
  }
}
