import { Component, OnInit } from '@angular/core';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogModel } from './models/log.model';
import { LogRequestModel } from './models/log-request.model';
import { LogService } from './service/log.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { UcafModel } from '../ucafs/models/ucaf.model';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule,
            BlankComponent,
            SectionComponent,
            FormsModule],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  result : PaginationResultModel<LogModel[]> =  new PaginationResultModel<LogModel[]>();
  pageNumber :number = 0;
  pageSize = 10;
  pageNumbers:number[] = []
  filterText : string="";
  model : LogRequestModel = new LogRequestModel();
  
  constructor(
    private _logService: LogService

  ){
    this.model.companyId = "c8eabb42-0474-43fc-8b97-6fefb2041a67";
    this.model.tableName ="UCAF";
    this.model.pageNumber = 1;
    this.model.pageSize =10;
  }
  ngOnInit(): void {
    this.getAll();
  } 

  getAll(pageNumber:number = 1){
    this.model.pageNumber = pageNumber;
    this._logService.getAll(this.model,res => {
          this.result = res.data;
          this.result.datas.forEach(element =>{
            let model = JSON.parse(element.data);
            element.dataObject = model;
          });
          console.log(this.result);
          this.pageNumbers = [];
          for (let i = 0; i < this.result.totalPages;i++){
            this.pageNumbers.push(i+1)
          }
    })
  }

  changeLogProgress(progress:string){
    if(progress =="Delete")
      return 'Silme';
    else if(progress =="UpdateOld")
      return 'Güncelleme (Eski)';
    else if(progress =="UpdateNew")
      return 'Güncelleme (Yeni)';
    else(progress == "Create")
        return 'Yeni Kayıt';
    
  }
}