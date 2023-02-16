import { CompanyModel } from '../../model/company.model';
import { GenericHttpService } from 'src/app/common/models/service/generic-http.service';
import { Injectable } from '@angular/core';
import { MainRoleModel } from '../../../navigationItem/models/mainRole.models';
import { MainRoleUserModel } from '../../model/mainRole-user.model';
import { MessageReponseModel } from 'src/app/common/models/message-response.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { UserCompanyModel } from '../../model/user-company.model';
import { UserModel } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http:GenericHttpService
  ) { }

  getAllUsers(callBack: (res:ResponseModel<UserModel[]>) => void){
   
    this._http.get<ResponseModel<UserModel[]>>("User/GetAllUsers",res => callBack(res));
  }

  getMainRoleUsers(callBack: (res:ResponseModel<MainRoleUserModel[]>)=>void){
    this._http.get<ResponseModel<MainRoleUserModel[]>>("MainRoleUser/GetAll",res => callBack(res));
  }
  getAllMainRoles(callBack :(res:ResponseModel<MainRoleModel[]>)=>void){
    this._http.get<ResponseModel<MainRoleModel[]>>("MainRole/GetAllMainRole",res => callBack(res));
  }

  addMainRoleUser(model:MainRoleUserModel,callBack:(res:MessageReponseModel)=>void){
    this._http.post<MessageReponseModel>("MainRoleUser/Create",model,res=> callBack(res));
  }

  getUserCompanies(callBack: (res:ResponseModel<UserCompanyModel[]>)=>void){
    this._http.get<ResponseModel<UserCompanyModel[]>>("UserCompany/GetAll",res => callBack(res));
  }

  getCompanies(callBack:(res:ResponseModel<CompanyModel[]>)=>void){
    this._http.get<ResponseModel<CompanyModel[]>>("Companies/GetAllCompanies",res =>callBack(res));
  }

  addUserCompany(model:UserCompanyModel,callBack:(res:MessageReponseModel)=>void){
    this._http.post<MessageReponseModel>("UserCompany/Create",model,res => callBack(res));
  }
}
