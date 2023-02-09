import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { MessageReponseModel } from 'src/app/common/models/message-response.model';
import { NavigationItemModel } from '../../models/navigationItem.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationaddService {

  constructor(
    private _http:GenericHttpService      
  ) { }

  add(model:NavigationItemModel,callBack:(res:MessageReponseModel)=>void){
    this._http.post<MessageReponseModel>("NavigationItem/Create",model,(res)=>callBack(res));
  }
  update(model:NavigationItemModel,callBack:(res:MessageReponseModel)=>void){
    this._http.post<MessageReponseModel>("NavigationItem/Update",model,(res)=>callBack(res));
  }
  
}


