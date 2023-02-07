import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CryptoService } from 'src/app/common/service/crypto.service';
import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../models/login-response.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api:string ="Auth/Login";
  
  constructor(
    private _http: GenericHttpService,  
    private _router: Router,
    private _crypto: CryptoService
  ) { }

  login(model:any){    
    this._http.post<LoginResponseModel>(this.api,model,res => {
      
   
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
}
