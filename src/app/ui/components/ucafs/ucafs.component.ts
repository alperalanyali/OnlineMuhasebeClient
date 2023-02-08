import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/service/toastr.service';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/common/service/crypto.service';
import { LoadingButtonComponent } from 'src/app/common/components/loading-button/loading-button.component';
import { LoginResponseModel } from '../auth/models/login-response.models';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { RemoveByIdModel } from './models/remove-by-id.model';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
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
            FormsModule,
            LoadingButtonComponent],
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
  
  isAddForm:boolean = false;
  isLoading:boolean = false;
  ucafs:UcafModel[];
  filterText:string = "";
  ucafType:string = "M"

  
  constructor(
    private _ucafService: UcafService,
    private _crypto: CryptoService,
    private _toastr: ToastrService
    ){
      let loginResponeString = _crypto.decrypto(localStorage.getItem('accessToken'));
      this.loginResponse = JSON.parse(loginResponeString);
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
  add(form:NgForm){
    if(form.valid){
      let model = new UcafModel();
      model.code = form.controls['code'].value;
      model.name = form.controls['name'].value;
      model.type= form.controls['type'].value;
      this._ucafService.add(model,(res)=>{
        form.reset();
        this.ucafType= "M";
        this.getAll();
        this._toastr.toast(ToastrType.Success,res.message,"Basarili");
      });
    }
  }

  removeById(id:string){
    var result = confirm("Silme işlemini yapmak istiyor musunuz?")
    if(result){
      let model = new RemoveByIdModel();
      model.id = id;
      this._ucafService.removeById(model,res=> {
        this.getAll();
        this._toastr.toast(ToastrType.Info,res.message,"Basarili");
      })
    }
  }
}
