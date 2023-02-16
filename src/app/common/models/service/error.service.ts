import { ToastrService, ToastrType } from './toastr.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
      private _toastr:ToastrService
    
  ) { }

  errorHandler(err:HttpErrorResponse){
    console.log(err);
    switch(err.status){
      case 0:
        this._toastr.toast(ToastrType.Error,"Hata!","Api Adresine ulaşılamıyor");        
        break;  
      case 404:
        this._toastr.toast(ToastrType.Error,"Hata!","Api adresi bulunamiyor");        
        break;
      case 500:
        if(err.error.Errors){
          let errors:any = err.error.Errors
         errors.forEach((element:any )=> {
          
          this._toastr.toast(ToastrType.Error,"Hata!",element);   
         })
         
        }else {
          this._toastr.toast(ToastrType.Error,"Hata!",err.error.ErrorMessage);   
        }
        break;
    }
    if(err.status == 0){
      
    }
    console.log(err);
  }
}
