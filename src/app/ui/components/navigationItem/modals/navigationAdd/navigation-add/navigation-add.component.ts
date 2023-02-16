import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/models/service/toastr.service';

import { CommonModule } from '@angular/common';
import { GenericHttpService } from 'src/app/common/models/service/generic-http.service';
import { NavigationItemModel } from '../../../models/navigationItem.model';
import { NavigationItemService } from '../../../service/navigation-item.service';
import { NavigationaddService } from '../../service/navigationadd.service';

@Component({
  selector: 'app-navigation-add',
  standalone: true,
  imports: [CommonModule,
            FormsModule
  
  ],
  templateUrl: './navigation-add.component.html',
  styleUrls: ['./navigation-add.component.css']
})
export class NavigationAddComponent implements OnInit {

@Input() navigationItem:NavigationItemModel;
addForm:NgForm;
navigationItems:NavigationItemModel[]=[];
  constructor(  
    private  _navigationItemService:NavigationItemService,
    private _navigationAddService:NavigationaddService,
    private _toastr: ToastrService
  ){
    this.checkIdIsEmpty();
  }
  ngOnInit():void{
    this.getNavigationItem(); 
    this.addForm.controls['menuname'].setValue(this.navigationItem.navigationName); 
    console.log(`Nav:${this.navigationItem.navigationName}`);
  }
  checkIdIsEmpty(){    
    if(this.navigationItem != null){
   
    }
  }
  add(form:NgForm){ 
    debugger;
    let closeBtn = document.querySelector("#closeBtn");
    let model = new NavigationItemModel();
    model.navigationName = form.controls['navigationName'].value;
    model.navigationPath = form.controls['navigationPath'].value;
    model.topNavigationId = form.controls["topNavigationId"].value;
    if(this.navigationItem == null){
      this._navigationAddService.add(model,res =>{
        form.reset();
        this._toastr.toast(ToastrType.Success,res.message,"Basarili");
      })
    } else {
      this._navigationAddService.update(model,res => {
        form.reset();
        this._toastr.toast(ToastrType.Success,res.message,"Basarili");
      })
    }
    
  }
  
  getNavigationItem(){  
 
  }
}
