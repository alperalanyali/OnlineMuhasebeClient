import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { NavigationItemModel } from '../models/navigationItem.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationItemService {

  constructor(
    private _http: GenericHttpService

  ) { }

  getAll(callBack: (res:ResponseModel<NavigationItemModel[]>)=>void){
    let model:any;
    this._http.get<ResponseModel<NavigationItemModel[]>>("NavigationItem/GetNavigationItems",res => callBack(res));
  }
}


