import { CryptoService } from 'src/app/common/models/service/crypto.service';
import { GenericHttpService } from 'src/app/common/models/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../../auth/models/login-response.models';
import { MessageReponseModel } from 'src/app/common/models/message-response.model';
import { RemoveByIdModel } from '../models/remove-by-id.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { UcafModel } from '../models/ucaf.model';
@Injectable({
  providedIn: 'root'
})
export class UcafService {  
  
  loginResponse:LoginResponseModel = new LoginResponseModel();


  constructor(
    private _crypto:CryptoService,
    private _http:GenericHttpService
  ) {

    let loginResponeString = _crypto.decrypto(localStorage.getItem('accessToken'));
    this.loginResponse = JSON.parse(loginResponeString);
   }

  getAll(callBack: (res:ResponseModel<UcafModel[]>)=>void) {    
    let model = {
      companyId:this.loginResponse.company.companyId,
      codeOrName:"",
      type:""
    };
    this._http.post<ResponseModel<UcafModel[]>>("UCAF/GetAllUcafs",model,res => callBack(res),true);
    
  }

  add(model:UcafModel,callBack: (res:MessageReponseModel)=>void){
    model.companyId = this.loginResponse.company.companyId;
    this._http.post<MessageReponseModel>("UCAF/CreateUCAF",model,(res) =>{
      console.log(res);
      
      callBack(res);
    } );
  }

  removeById(model:RemoveByIdModel,callBack:(res:MessageReponseModel)=>void){
    model.companyId = this.loginResponse.company.companyId;
    this._http.post<MessageReponseModel>("UCAF/DeleteById",model,(res)=>callBack(res));
  }
  update(model:UcafModel,callBack:(res:MessageReponseModel) => void){
    debugger;
    model.companyId = this.loginResponse.company.companyId;
    this._http.post<MessageReponseModel>("UCAF/Update",model,(res)=>callBack(res));
  }
}
