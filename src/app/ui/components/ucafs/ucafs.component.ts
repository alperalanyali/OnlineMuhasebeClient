import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/service/toastr.service';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/common/service/crypto.service';
import { ExcelLoadingButtonComponent } from 'src/app/common/components/excel-loading-button/excel-loading-button.component';
import { LoadingButtonComponent } from 'src/app/common/components/loading-button/loading-button.component';
import { LoginResponseModel } from '../auth/models/login-response.models';
import { LoginResponseService } from 'src/app/common/service/login-response.service';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { RemoveByIdModel } from './models/remove-by-id.model';
import { ReportRequestModel } from 'src/app/common/models/report-request.model';
import { ReportsService } from '../reports/service/reports.service';
import { Router } from '@angular/router';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SwalService } from 'src/app/common/service/swal.service';
import { UcafModel } from './models/ucaf.model';
import { UcafPipe } from './pipes/ucaf.pipe';
import { UcafService } from './services/ucaf.service';
import { ValidInputDirective } from 'src/app/common/directives/valid-input.directive';

@Component({
  selector: 'app-ucafs',
  standalone: true,
  imports: [CommonModule,
            BlankComponent,
            SectionComponent,
            UcafPipe,
            FormsModule,
            ValidInputDirective,            
            LoadingButtonComponent,
            ExcelLoadingButtonComponent],
  templateUrl: './ucafs.component.html',
  styleUrls: ['./ucafs.component.css']
})
export class UcafsComponent implements OnInit {
  loginResponse:LoginResponseModel = new LoginResponseModel();
  navs:NavModel[]= [
    {
      routerLink:"/",
      name:"Ana Sayfa",
      class:""      
    },
    {
      routerLink:"/ucafs",
      name:"Hesap Planı",
      class:""
    }

  ];
  
  updateUcafModel: UcafModel = new UcafModel();
  isAddForm:boolean = false;
  isUpdateForm:boolean  = false;
  
  ucafs:UcafModel[];
  filterText:string = "";
  ucafType:string = "M"

  
  constructor(
    private _ucafService: UcafService,
    private  _loginResponseService: LoginResponseService,
    private _toastr: ToastrService,
    private _swal:SwalService,
    private _reportService:ReportsService,
    private _router:Router
    )
    {
      this.loginResponse = this._loginResponseService.getLoginResponse();
  }
  ngOnInit():void{
    this.getAll();
    
  }
  getAll(){
    this._ucafService.getAll(res => {
       this.ucafs = res.data;            
    });    
  }
  showAdd(){
    this.isAddForm = !this.isAddForm;    
  }

  cancelBtn(){
    this.isAddForm = false;
    this.isUpdateForm = false;
    
  }
  add(form:NgForm){
    if(form.valid){
      let model = new UcafModel();
      model.code = form.controls['code'].value;
      model.name = form.controls['name'].value;
      model.type= form.controls['type'].value;
      this._ucafService.add(model,(res)=>{
        form.controls['code'].setValue('');
        form.controls['name'].setValue('');
        this.ucafType= "M";
        this.getAll();
        this._toastr.toast(ToastrType.Success,res.message,"Basarili");
      });
    }
  }
  get(model:UcafModel){
    this.updateUcafModel = { ...model};
    this.isUpdateForm = true;
    this.isAddForm = false;
  }
  update(form:NgForm){  
    debugger;
    let model = new UcafModel();
    model.id = this.updateUcafModel.id;
    model.code = form.controls['code'].value;
    model.name = form.controls["name"].value;
    model.type = form.controls["type"].value;    
    this._ucafService.update(model,res => {
      console.log(res);
    })
  }
  removeById(id:string){
    this._swal.callSwal('Sil','Sil?',"Hesap planı kodunu silmek istiyor musunuz?", ()=>{
      let model = new RemoveByIdModel();
      model.id = id;
      this._ucafService.removeById(model,res=> {
        this.getAll();
        this._toastr.toast(ToastrType.Info,res.message,"Basarili");
      })
    }) 
  }

  setTrClass(type:string){
    if( type ==="A"){
      return "text-danger";
    }else if(type === "G")
      return "text-primary";
    else 
      return "";
  }
  exportExcel(){
    let model :ReportRequestModel = new ReportRequestModel();
    model.type = "UCAF";
    this._reportService.request(model,(res)=>{
        this._toastr.toast(ToastrType.Info,res.message);
        this._router.navigateByUrl('/reports');
    })
  }
}
