import { GenericHttpService } from 'src/app/common/service/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginResponseService } from 'src/app/common/service/login-response.service';
import { ReportModel } from '../../navigationItem/models/reports.model';
import { RequestModel } from '../../navigationItem/models/request.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  apiUrl:string='Reports/GetAll';
  constructor(
    private _http:GenericHttpService,
    private _loginResponseService:LoginResponseService
  ) { 

  }

  getAll(callBack:(res:ResponseModel<ReportModel[]>)=>void) {
    let model:RequestModel = new RequestModel();
    model.companyId = this._loginResponseService.getLoginResponse().company.companyId;
    this._http.post<ResponseModel<ReportModel[]>>(this.apiUrl,model,res => callBack(res))
  }
}
