import {FormsModule, NgForm} from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/service/toastr.service';

import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {LoadingButtonComponent} from 'src/app/common/components/loading-button/loading-button.component';
import { RouterModule } from '@angular/router';
import { ValidInputDirective } from 'src/app/common/directives/valid-input.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ValidInputDirective,LoadingButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  isLoading:boolean = false;

  constructor(
    private _auth:AuthService,
    private _toastrService:ToastrService
  ){
  }
  login(form:NgForm){
    if(form.valid){
        this.isLoading= true
        this._auth.login(form.value);
      }
  }
}