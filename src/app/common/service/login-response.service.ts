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
  ) { 

    let loginResponeString = _crypto.decrypto(localStorage.getItem('accessToken'));
    this.loginResponse = JSON.parse(loginResponeString);
    
  }

  getLoginResponse(){
    return this.loginResponse;
  }
  
  
}
