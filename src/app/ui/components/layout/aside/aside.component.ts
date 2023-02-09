import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AsideService } from './service/aside.service';
import { AuthService } from '../../auth/service/auth.service';
import { CommonModule } from '@angular/common';
import { LoginResponseModel } from '../../auth/models/login-response.models';
import { MenuItem } from './models/menuItem';
import { Navigations } from 'src/app/ui/router/navigation';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent  implements OnInit   {
 @Input() loginResponse:LoginResponseModel =new LoginResponseModel();
  
 
  navigations  = Navigations;
  menuItems: MenuItem[] =[];

  
  constructor(
            private _asideService:AsideService,
            private _authService: AuthService){
 
    
  }
  ngOnInit():void{
    this._asideService.getMenus(res =>{
      console.log(res);
      this.menuItems = res.data;
    });
    
  }
  logout(){
    this._authService.logout();
  }
}
