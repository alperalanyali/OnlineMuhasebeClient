import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CryptoService } from './crypto.service';
import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  apiUrl: string = "";
  token:string =localStorage.getItem('token');
  constructor(
    private _http:HttpClient,
    private _error:ErrorService,
    private _crypto:CryptoService
  ) { }


  get<T>(api: string, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
  
    this._http.get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize)).subscribe({
      next: (res) => callBack(res),
      error: (err: HttpErrorResponse) => this._error.errorHandler(err)
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    
    this._http.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      next: (res) => callBack(res),
      error: (err: HttpErrorResponse) => this._error.errorHandler(err)
    });
  }
  // put<T>(api: string,model:any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false ){
  //   this._http.put<T>(`${this.setApi(diffApi,api)}`,model,this.setOptions(authorize)).subscribe({
  //     next: (res) => callBack(res),
  //     error: (err: HttpErrorResponse) => this._error.errorHandler(err)
  //   });
  // }
  // delete<T>(api: string,model:any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false ){
  //   debugger;
  //   this._http.delete<T>(`${this.setApi(diffApi,api)}`,{
  //     params:model
  //   }
  //   ).subscribe({
  //     next: (res) => callBack(res),
  //     error: (err: HttpErrorResponse) => this._error.errorHandler(err)
  //   });;
 
  // }
  setApi(diffApi: boolean, api: string) {
    if (diffApi)
      return api;    
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {
    if (authorize)
      return { headers: { "Authorization": `Bearer ${this._crypto.decrypto(localStorage.getItem("accesstoken"))}`}}
    return {}
  }
}
