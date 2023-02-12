import { Component, Input } from '@angular/core';

import { AuthService } from '../../auth/service/auth.service';
import { CommonModule } from '@angular/common';
import { LoginResponseModel } from '../../auth/models/login-response.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  @Input() loginResponse:LoginResponseModel =new LoginResponseModel();
  constructor(   private _authService: AuthService){
    
  }
  logout(){
    this._authService.logout();
  }
}
