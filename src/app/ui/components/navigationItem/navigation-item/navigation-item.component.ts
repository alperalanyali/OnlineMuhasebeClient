import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/service/toastr.service';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { MainRoleModel } from '../models/mainRole.models';
import { NavigationAddComponent } from '../modals/navigationAdd/navigation-add/navigation-add.component';
import { NavigationItemDeleteById } from '../models/navigationItem-removeById.model';
import { NavigationItemMainRoleById } from '../models/navigationItemMainRole-remove-by.model';
import { NavigationItemMainRoleModel } from '../models/navigationItemMainRole.models';
import { NavigationItemModel } from '../models/navigationItem.model';
import { NavigationItemService } from '../service/navigation-item.service';
import { NavigationaddService } from '../modals/service/navigationadd.service';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';

@Component({
  selector: 'app-navigation-item',
  standalone: true,
  imports: [CommonModule,
            BlankComponent,
            SectionComponent,            
            FormsModule,
            NavigationAddComponent           
            ],
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.css']
})



export class NavigationItemComponent implements OnInit {
  

  
  navigationItems:NavigationItemModel[] = [];
  navigationItemMainRole: NavigationItemMainRoleModel[] = [];
  mainRoles: MainRoleModel[] = [];
  filterText:string ="";
  isMenuRoleVisible:boolean = false;
  constructor(
    private _navigationItemService: NavigationItemService,
    private _toastr: ToastrService,
    private _navigationAddService: NavigationaddService
  ){
    
  }

  ngOnInit():void{
    this.getAll();

    
  }
  getAll(){
    this._navigationItemService.getAllNavItem(res => {
      this.navigationItems = res.data;
      // console.log(this.navigationItems)      
    });
    this._navigationItemService.getAllNavMainRole(res => {
      this.navigationItemMainRole = res.data;
      // console.log(this.navigationItemMainRole);
    });
    this._navigationItemService.getAllMainRole(res => {
      this.mainRoles = res.data;
      // console.log(res);
      // console.log(this.mainRoles)
    })
  }

  toggleMenuRoleAdd(){
    this.isMenuRoleVisible = !this.isMenuRoleVisible;
  }

  addMenuRole(form:NgForm){
    
    let model = new NavigationItemMainRoleModel();
    model.mainRoleId = form.controls["mainRoleId"].value;
    model.navigationItemId = form.controls["navigationItemId"].value;
    this._navigationItemService.addMenuRole(model,res =>{
      // console.log(res);
      this._toastr.toast(ToastrType.Success,res.message,"Basarili");
      this.getAll();
    })    
  }
  deleteMenuById(id:string){
    let model =  new NavigationItemDeleteById();
    model.id = id;
    this._navigationItemService.deleteNavigationItemById(model,res =>{
      this.getAll();
    })
  }
  deleteMenuRoleById(id:string){
    let model = new NavigationItemMainRoleById();
    model.id =id;
    
    this._navigationItemService.deleteNavigationMainRole(model,res =>{
        this._toastr.toast(ToastrType.Success,res.message,"Basarili");
        this.getAll();      
    })
  }

  getId(navigationItem:NavigationItemModel){
    

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
    this._navigationItemService.getAllNavItem(res => {
      this.navigationItems = res.data;        
    });
  }
 
}
