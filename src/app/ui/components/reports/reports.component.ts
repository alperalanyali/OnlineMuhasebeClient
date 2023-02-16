import { Component, OnInit } from '@angular/core';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from 'src/app/common/components/loading-button/loading-button.component';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { ReportModel } from '../navigationItem/models/reports.model';
import { ReportsService } from './service/reports.service';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,BlankComponent,SectionComponent,LoadingButtonComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit  {
  navs:NavModel[]= [
    {
      routerLink:"/",
      name:"Ana Sayfa",
      class:""      
    },
    {
      routerLink:"/report",
      name:"Raporlar",
      class:""
    }
    
  ];
  reports:ReportModel[] = []
  constructor(
    private _report:ReportsService
    
  ){
    
  }
  ngOnInit() {
    this.getAll();
    
  }

  getAll(){
    this._report.getAll(res => this.reports = res.data)
  }

  changeSpanClassByStatus(status:boolean){
    if(status){
      return 'text-success'
    }else
      return 'text-danger';
  }
}
