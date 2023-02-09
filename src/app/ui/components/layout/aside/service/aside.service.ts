import { Navigation, Navigations } from 'src/app/ui/router/navigation';

import { CryptoService } from 'src/app/common/service/crypto.service';
import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menuItem';
import { ResponseModel } from 'src/app/common/models/response.model';
import { mode } from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class AsideService {
  api = "NavigationItemMainRole/GetNavigationItemMainRoleByMainRoleId?mainRoleId=0bb952c5-af2c-4f1e-8af5-4a2ad11fcb4a";
  
  constructor(    private _http: GenericHttpService, 
    private _crypto: CryptoService ) {       
    }
    navigations = Navigation;
    getMenus(callBack:(res:ResponseModel<MenuItem[]>)=>void){
      let cryoToken = JSON.parse(this._crypto.decrypto(localStorage.getItem("accessToken")));
      console.log(cryoToken.userId);
      let model = {
        id:cryoToken.userId
      }
      this._http.get<ResponseModel<MenuItem[]>>(`NavigationItemMainRole/GetNavigationItemMainRoleByUserId?userId=${model.id}`,res => callBack(res));
      /*let userInfo = this._http.get(this.api,(res)=>{
       // console.log(res)
      },false)*/
    }
    
}
