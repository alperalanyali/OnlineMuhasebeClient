import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LogModel } from '../models/log.model';
import { LogRequestModel } from '../models/log-request.model';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { UcafModel } from '../../ucafs/models/ucaf.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(model:LogRequestModel, callBack:(res:ResponseModel<PaginationResultModel<LogModel[]>>)=>void){
    this._http.post<ResponseModel<PaginationResultModel<LogModel[]>>>("Log/GetAllByTableName",model,res => {
       callBack(res); 
    })
  }
}
