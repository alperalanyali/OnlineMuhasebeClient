import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/ui/components/auth/guard/auth.guard';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { importProvidersFrom } from '@angular/core';
import {loadingReducer} from './app/common/state/Loading/loading-reducer';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent,{ 
    providers:[
        DatePipe,
        provideHttpClient(),
        importProvidersFrom(
            BrowserModule,
            SweetAlert2Module.forRoot(),
            StoreModule.forRoot({loading:loadingReducer}),
            RouterModule.forRoot([
                {
                    path:"",
                    loadComponent:()=>import("./app/ui/components/layout/layout.component").then(c => c.default),
                    canActivateChild:[AuthGuard],
                    children:[
                        {
                            path:"",
                            loadComponent: ()=>import("./app/ui/components/blank/blank.component").then(c => c.BlankComponent)
                        },
                        {
                            path:"ucafs",
                            loadComponent: ()=>import("./app/ui/components/ucafs/ucafs.component").then(c => c.UcafsComponent)
                        },
                        {
                            path:"navigationItems",
                            loadComponent: ()=>import("./app/ui/components/navigationItem/navigation-item/navigation-item.component").then(c => c.NavigationItemComponent)
                        },
                        {
                            path:"users",
                            loadComponent: ()=>import("./app/ui/components/users/users/users.component").then(c => c.UsersComponent)
                        },
                        {
                            path:"reports",
                            loadComponent: ()=> import("./app/ui/components/reports/reports.component").then(c => c.ReportsComponent)
                        },
                        {
                            path:"logs",
                            loadComponent: ()=> import("./app/ui/components/log/log.component").then(c=> c.LogComponent)
                        },
                        {
                            path:"bookEntries",
                            loadComponent: ()=>import("./app/ui/components/book-entries//book-entries.component").then(c => c.BookEntriesComponent)
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
