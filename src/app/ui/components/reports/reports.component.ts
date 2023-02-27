import { Component, OnInit } from '@angular/core';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from 'src/app/common/components/loading-button/loading-button.component';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
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
  result:PaginationResultModel<ReportModel[]> = new PaginationResultModel<ReportModel[]>();
  pageNumber:number = 1;
  pageSize:number=5;
  pageNumbers: number[] = []
  interval:any ;
  count:number = 0;
  constructor(
    private _report:ReportsService
    
  ){
    
  }
  ngOnInit() {
    this.getAll();
    this.interval = setInterval(() => {
        if(this.count <= 25){
          this.count++;
          this.getAll(this.pageNumber);
        }else {
          clearInterval(this.interval); 
        }

    })
  }

  getAll(pageNumber:number=1){
    this.pageNumber = pageNumber;
    this._report.getAll(pageNumber,5,res => {       
      this.result = res.data;
      this.pageNumbers = []
      for(let i=0;i<this.result.totalPages;i++){
        this.pageNumbers.push(i+1);
      }
      
    })
  }

  changeSpanClassByStatus(status:boolean){
    if(status){
      return 'text-success'
    }else
      return 'text-danger';
  }
}
