import { BookEntryModel } from '../models/book-entry.model';
import { CreateBookEntryModel } from '../models/create-book-entry.model';
import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseService } from 'src/app/common/service/login-response.service';
import { MessageReponseModel } from 'src/app/common/models/message-response.model';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { RequestModel } from '../../navigationItem/models/request.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BookEntryService {

  constructor(
    private _http:GenericHttpService,
    private _loginResponse:LoginResponseService
  ) { }

  getAll(model:RequestModel,callBack:(res:PaginationResultModel<BookEntryModel[]>)=> void){
    model.companyId = this._loginResponse.getLoginResponse().company.companyId;
      this._http.post<PaginationResultModel<BookEntryModel[]>>("BookEntry/GetAllBoonEntries",model,res => callBack(res));
  }

  create(model:CreateBookEntryModel,callBack:(res:MessageReponseModel)=>void){
    model.companyId = this._loginResponse.getLoginResponse().company.companyId;
    this._http.post<MessageReponseModel>("BookEntry/Create",model,res => {
      callBack(res);
    })
  }
}
