import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CryptoService } from 'src/app/common/models/service/crypto.service';
import { GenericHttpService } from 'src/app/common/models/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../models/login-response.models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeLoading } from 'src/app/common/state/Loading/loading.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api:string ="Auth/Login";
  
  constructor(
    private _http: GenericHttpService,  
    private _router: Router,
    private _crypto: CryptoService,
    private _store:Store<{loading:boolean}>    
  ) { }

  login(model:any){  
    this._store.dispatch(changeLoading());
    this._http.loginPost<LoginResponseModel>(this.api,model,res => {
      this._store.dispatch(changeLoading());
      let cryptoToken = this._crypto.encrypto(JSON.stringify(res));      
      localStorage.setItem('accessToken',cryptoToken);
      this._router.navigateByUrl("/");
    },false)
    let options={
      id :"b729037c-4c9f-42ef-95f7-0440ec26b4cf"
    }
  }

  logout(){
    localStorage.removeItem("accesstoken");
    this._router.navigateByUrl("/login");
  }

  getTokenByRefreshId(model:any,callBack: (res:LoginResponseModel)=>void){
    this._http.post<LoginResponseModel>("Auth/GetTokenByRefreshToken",model,res => {
      let cryptoToken = this._crypto.encrypto(JSON.stringify(res));      
      localStorage.setItem('accessToken',cryptoToken);
      // callBack(res);
      // this._router.navigateByUrl("/");
    },false)
  }
}
