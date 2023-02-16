import { AsideComponent } from './aside/aside.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import {CryptoService} from '../../../common/models/service/crypto.service';
import { FooterComponent } from './footer/footer.component';
import { LoginResponseModel } from '../auth/models/login-response.models';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterModule,AsideComponent,FooterComponent,NavbarComponent,ControlSidebarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export default class LayoutComponent {
  loginResponse:LoginResponseModel = new LoginResponseModel();
  constructor(private _crypto:CryptoService){
      let loginResponeString = _crypto.decrypto(localStorage.getItem('accessToken'));
      this.loginResponse = JSON.parse(loginResponeString);
    
  }
}
