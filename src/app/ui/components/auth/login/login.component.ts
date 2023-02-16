import {FormsModule, NgForm} from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/models/service/toastr.service';

import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {LoadingButtonComponent} from 'src/app/common/components/loading-button/loading-button.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ValidInputDirective } from 'src/app/common/directives/valid-input.directive';
import { changeLoading } from 'src/app/common/state/Loading/loading.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ValidInputDirective,LoadingButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  

  constructor(
    private _auth:AuthService,
    private _toastrService:ToastrService,
  
  ){
  }
  login(form:NgForm){    
    if(form.valid){        
        this._auth.login(form.value);
      }
  }
}