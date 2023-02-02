import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent,{
    providers:[
        importProvidersFrom(
            BrowserModule,
            RouterModule.forRoot([
                {
                    path:"",
                    loadComponent:()=>import("./app/ui/components/layout/layout.component").then(c => c.LayoutComponent),
                    children:[
                        {
                            path:"",
                            loadComponent: ()=>import("./app/ui/components/blank/blank.component").then(c => c.BlankComponent)
                        }
                    ]
                },
                {
                    path:"login",
                    loadComponent:()=> import("./app/ui/components/auth/login/login.component").then(c => c.LoginComponent)
                }
            ])
        )
    ]
})
