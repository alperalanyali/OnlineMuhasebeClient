import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/service/toastr.service';

import { CommonModule } from '@angular/common';
import { GenericHttpService } from 'src/app/common/service/generic-http.service';
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
@Input() Id:string = '';
navigationItems:NavigationItemModel[]=[];
  constructor(  
    private  _navigationItemService:NavigationItemService,
    private _navigationAddService:NavigationaddService,
    private _toastr: ToastrService
  ){
    
  }
  ngOnInit():void{
    this.getNavigationItem();
    
  }
  add(form:NgForm){ 
    let model = new NavigationItemModel();
    model.navigationName = form.controls['navigationName'].value;
    model.navigationPath = form.controls['navigationPath'].value;
    model.topNavigationId = form.controls["topNavigationId"].value;
    this._navigationAddService.add(model,res =>{
      form.reset();
      this._toastr.toast(ToastrType.Success,res.message,"Basarili");
    })
  }


  getNavigationItem(){  
    this._navigationItemService.getAll(res => {
      this.navigationItems = res.data;        
    });
  }

}
