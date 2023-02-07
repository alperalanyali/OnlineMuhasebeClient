import { CryptoService } from 'src/app/common/service/crypto.service';
import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../../auth/models/login-response.models';
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
}
