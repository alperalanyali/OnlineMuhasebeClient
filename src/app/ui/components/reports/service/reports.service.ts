import { GenericHttpService } from 'src/app/common/models/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseService } from 'src/app/common/models/service/login-response.service';
import { MessageReponseModel } from 'src/app/common/models/message-response.model';
import { ReportModel } from '../../navigationItem/models/reports.model';
import { ReportRequestModel } from 'src/app/common/models/report-request.model';
import { RequestModel } from '../../navigationItem/models/request.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private _http:GenericHttpService,
    private _loginResponseService:LoginResponseService
  ) { 

  }

  getAll(callBack:(res:ResponseModel<ReportModel[]>)=>void) {
    let model:RequestModel = new RequestModel();
    model.companyId = this._loginResponseService.getLoginResponse().company.companyId;
    this._http.post<ResponseModel<ReportModel[]>>('Reports/GetAll',model,res => callBack(res))
  }

  request(model:ReportRequestModel,callBack:(res:MessageReponseModel)=>void){
    model.companyId = this._loginResponseService.getLoginResponse().company.companyId;
    this._http.post<MessageReponseModel>("Reports/RequestReport",model,res=> { 
      callBack(res);
    })
  }
}
