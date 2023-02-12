import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { MainRoleModel } from '../models/mainRole.models';
import { MessageReponseModel } from 'src/app/common/models/message-response.model';
import { NavigationItemDeleteById } from '../models/navigationItem-removeById.model';
import { NavigationItemMainRoleById } from '../models/navigationItemMainRole-remove-by.model';
import { NavigationItemMainRoleModel } from '../models/navigationItemMainRole.models';
import { NavigationItemModel } from '../models/navigationItem.model';
import { NgForm } from '@angular/forms';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationItemService {

  constructor(
    private _http: GenericHttpService

  ) { }

  getAllNavItem(callBack: (res:ResponseModel<NavigationItemModel[]>)=>void){
    let model:any;
    this._http.get<ResponseModel<NavigationItemModel[]>>("NavigationItem/GetNavigationItems",res => callBack(res));
  }

  getAllNavMainRole(callBack: (res:ResponseModel<NavigationItemMainRoleModel[]>)=>void){
    this._http.get<ResponseModel<NavigationItemMainRoleModel[]>>("NavigationItemMainRole/GetNavigationItemMainRole",res => callBack(res));
  }

  getAllMainRole(callBack :(res:ResponseModel<MainRoleModel[]>)=>void){
    this._http.get<ResponseModel<MainRoleModel[]>>("MainRole/GetAllMainRole",res => callBack(res));
  }

  addMenuRole(model:NavigationItemMainRoleModel,callBack:(res:MessageReponseModel)=>void){    
    this._http.post<MessageReponseModel>("NavigationItemMainRole/Create",model,res=> callBack(res));
  }

  deleteNavigationMainRole(model:NavigationItemMainRoleById,callBack:(res:MessageReponseModel)=>void){
    this._http.post<MessageReponseModel>("NavigationItemMainRole/DeleteById",model,res => callBack(res));
  }
  deleteNavigationItemById(model:NavigationItemDeleteById,callBack:(res:MessageReponseModel)=>void){
    this._http.post<MessageReponseModel>("NavigationItem/Delete",model,res => callBack(res));
  }

}