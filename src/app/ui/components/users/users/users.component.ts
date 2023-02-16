import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/models/service/toastr.service';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { CompanyModel } from '../model/company.model';
import { MainRoleModel } from '../../navigationItem/models/mainRole.models';
import { MainRoleUserModel } from '../model/mainRole-user.model';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { UserCompanyModel } from '../model/user-company.model';
import { UserModel } from '../model/user.model';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
            BlankComponent,
            SectionComponent,
            FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserModel[]=[];
  mainRoleUsers: MainRoleUserModel[] = [];
  mainRoles: MainRoleModel[] = []
  userCompanies : UserCompanyModel[] = [];
  companies:CompanyModel[]=[];
  isMainRoleUserAddVisible:boolean = false;
  isUserCompanyAddVisible:boolean = false;
  
  constructor(
      private _usersService: UsersService,
      private _toastr : ToastrService
      
  ){
  }
  ngOnInit():void{
    this.getAllUsers();
    this.getMainRoleUsers();
    this.getMainRoles();
    this.getUserCompany();
    this.getAllCompanies();
  }

  getAllUsers(){
    this._usersService.getAllUsers(res => {
      this.users = res.data;
      // console.log(this.users);
    })
  }

  getMainRoleUsers(){
    this._usersService.getMainRoleUsers(res=>{
      this.mainRoleUsers = res.data;   
    }) 
  }
  getMainRoles(){
   this._usersService.getAllMainRoles(res=>{
    this.mainRoles = res.data;
   })   
  }

  getUserCompany(){
    this._usersService.getUserCompanies(res => {
       this.userCompanies = res.data;       
    })
  }
  toggleMainRoleUserAdd(){
    this.isMainRoleUserAddVisible = !this.isMainRoleUserAddVisible
  }
  toggleUserComoanyAdd(){
    this.isUserCompanyAddVisible = !this.isUserCompanyAddVisible
  }

  getAllCompanies(){
    this._usersService.getCompanies(res => {
      this.companies = res.data;
      console.log(res)
    })    
  }
  addMainRoleUser(form:NgForm){
    let model = new MainRoleUserModel();
    model.userId = form.controls["userId"].value;
    model.mainRoleId = form.controls["mainRoleId"].value;
    model.companyId = "c8eabb42-0474-43fc-8b97-6fefb2041a67"
    this._usersService.addMainRoleUser(model,res => {
      // console.log(res);
    })
  }

  addUserCompany(form:NgForm){
    let model = new UserCompanyModel();
    model.userId = form.controls["userId"].value;
    model.companyId = form.controls["companyId"].value;
    debugger;
    this._usersService.addUserCompany(model,res => {
      this._toastr.toast(ToastrType.Success,res.message,"Basarili");
      this.getUserCompany();
    })
  }
}
