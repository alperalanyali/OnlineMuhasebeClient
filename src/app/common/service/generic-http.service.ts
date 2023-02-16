import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CryptoService } from './crypto.service';
import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/ui/components/auth/models/login-response.models';
import { LoginResponseService } from './login-response.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeLoading } from '../state/Loading/loading.actions';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  apiUrl: string = "http://localhost:5004/api/v1/";
  loginResponse:LoginResponseModel =new LoginResponseModel();
  token:string ="";
  isLoading:boolean = false;
  constructor(
    private _http:HttpClient,
    private _error:ErrorService,
    private _crypto:CryptoService,
    private _loginResponseService:LoginResponseService,
    private _router:Router,
    private _store:Store<{loading:boolean}>
  ) {
    this._store.select("loading").subscribe(res=>{
      this.isLoading = res
    })
   }


  get<T>(api: string, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    this.getToken();
    if(!this.isLoading)
        this._store.dispatch(changeLoading());  
    this._http.get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize)).subscribe({
      next: (res) => {
                        if(this.isLoading)
                      this._store.dispatch(changeLoading());  
                      callBack(res)
                    },
      error: (err: HttpErrorResponse) =>{        
        if(this.isLoading){
          this._store.dispatch(changeLoading());  
          this._error.errorHandler(err)
        }
        
      }
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {    
    this.getToken();
    if(!this.isLoading)
        this._store.dispatch(changeLoading());  
    this._http.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      
      next: (res) => {
        if(this.isLoading)
        this._store.dispatch(changeLoading());  
        callBack(res)
      },
      error: (err: HttpErrorResponse) =>{
        if(this.isLoading){
          this._store.dispatch(changeLoading());  
          this._error.errorHandler(err)
        }
      }
    });
  }
  loginPost<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {        
    this._http.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      next: (res) => callBack(res),
      error: (err: HttpErrorResponse) =>{
        if(this.isLoading){
          this._store.dispatch(changeLoading());  
          this._error.errorHandler(err)
        }
      }
    });
  }
  setApi(diffApi: boolean, api: string) {
    if (diffApi)
      return api;    
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {    
    if (authorize){
      let accessToken =JSON.parse(this._crypto.decrypto(localStorage.getItem("accessToken")))      
      return { headers: { "Authorization": `Bearer ${accessToken.token.token}`}}
    }   
    return {}
  }

  getToken(){
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken == null || accessToken == undefined) return;
    this.loginResponse = this._loginResponseService.getLoginResponse();     
    if(this.loginResponse != undefined && this.loginResponse != null && this.loginResponse.email != ""){
      
        this.token = this.loginResponse.token.token;  
        var decoded:any = jwt_decode(this.token);
        let time = new Date().getTime()/1000;
        let refreshTokenExpires = new Date(this.loginResponse.token.refreshTokenExpires).getTime() / 1000;
        if(time > decoded.exp ){
          if(refreshTokenExpires >= time){
            let model:{userId:string,refreshToken:string,companyId:string} = {
              userId:this.loginResponse .userId,
              refreshToken:this.loginResponse.token.refreshToken,
              companyId:this.loginResponse.company.companyId
            }
            this._http.post<LoginResponseModel>(this.apiUrl+"Auth/GetTokenByRefreshToken",model).subscribe({
              next:res => {
                let cryptoToken = this._crypto.encrypto(JSON.stringify(res));      
                localStorage.setItem('accessToken',cryptoToken);
                this.loginResponse = res; 
                this.token = res.token.token;
              },
              error:(err)=>{
                this._error.errorHandler(err);
                console.log(err);
                localStorage.removeItem("accesstoken");
                this._router.navigateByUrl("/login");
              }
            })            
          }else {
            localStorage.removeItem("accesstoken");
            this._router.navigateByUrl("/login");
          }
        }            
    }
  }
}
