import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/ui/components/auth/guard/auth.guard';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent,{ 
    providers:[
        provideHttpClient(),
        importProvidersFrom(
            BrowserModule,
            RouterModule.forRoot([
                {
                    path:"",
                    loadComponent:()=>import("./app/ui/components/layout/layout.component").then(c => c.LayoutComponent),
                    canActivateChild:[AuthGuard],
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
