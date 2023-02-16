import { CryptoService } from './crypto.service';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/ui/components/auth/models/login-response.models';

@Injectable({
  providedIn: 'root'
})
export class LoginResponseService {
  loginResponse:LoginResponseModel = new LoginResponseModel();
  constructor(
    private _crypto: CryptoService
  ) 
  { 
   
 
    
  }

  getLoginResponse(){
    let token = localStorage.getItem('accessToken')?.toString();
    if(token != undefined){
        
      let loginResponeString =this._crypto.decrypto(token);
      this.loginResponse = JSON.parse(loginResponeString);
    }
    return this.loginResponse;
  }
  
  
}
