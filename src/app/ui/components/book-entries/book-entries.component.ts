import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/common/service/toastr.service';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { BookEntryModel } from './models/book-entry.model';
import { BookEntryService } from './service/book-entry.service';
import { CreateBookEntryModel } from './models/create-book-entry.model';
import { ExcelLoadingButtonComponent } from "../../../common/components/excel-loading-button/excel-loading-button.component";
import { LoginResponseService } from 'src/app/common/service/login-response.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { RequestModel } from '../navigationItem/models/request.model';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { ValidInputDirective } from 'src/app/common/directives/valid-input.directive';

@Component({
    selector: 'app-book-entries',
    standalone: true,
    templateUrl: './book-entries.component.html',
    styleUrls: ['./book-entries.component.css'],
    imports: [CommonModule,
              BlankComponent, 
              SectionComponent, 
              ExcelLoadingButtonComponent,
              FormsModule,
              ValidInputDirective              ]
})
export class BookEntriesComponent implements OnInit {

  result:PaginationResultModel<BookEntryModel[]> = new PaginationResultModel<BookEntryModel[]>();
  filterText:string = "";
  pageNumbers:number[]=[]
  pageNumber:number=1;
  pageSize:number =10;
  dateInput:string = "";
  typeInput:string="Muavin";

  constructor(
    private _bookEntryService: BookEntryService,
    private _date:DatePipe,
    private _toastr :ToastrService,
    private _loginResponse: LoginResponseService
  ){
    this.dateInput=_date.transform(new Date(),'yyyy-MM-dd')
    
  }
  ngOnInit(): void {
    this.getAll();
  } 

  showAdd(){
    
  }
  exportExcel(pageNumber:number=1){
    
  }
  getAll(pageNumber:number=1){
    this.pageNumber = pageNumber;
    let model:RequestModel = new RequestModel();
    model.pageNumber = this.pageNumber;
    model.pageSize = this.pageSize;
    model.year = this._loginResponse.getLoginResponse().year;
    this._bookEntryService.getAll(model,res =>{
      this.result = res;
      this.pageNumbers = [];
      for(let i=0;i<res.totalPages;i++){
        this.pageNumbers.push(i+1);
      }
    })
    
  }
  get(bookEntry:BookEntriesComponent){
    
  }
  removeById(id:string){
    
  }

  create(form:NgForm){
    let closeBtn = document.getElementById("closeBtn") as HTMLElement;
    console.log(closeBtn);
    if(form.valid){
      let model:CreateBookEntryModel = new CreateBookEntryModel();
      model.date = form.controls["date"].value;
      model.type = form.controls["type"].value;
      model.description = form.controls["description"].value;      
      let year = this.dateInput.split("-")[0];
      if(this._loginResponse.getLoginResponse().year != +year){
        this._toastr.toast(ToastrType.Error,"Sadece seçili yıla işlem yapabilirsiniz")
        return
      }
      
      this._bookEntryService.create(model,(res) => {
        
        this._toastr.toast(ToastrType.Success,res.message,"");
        
        form.controls["description"].setValue("");
        this.dateInput=this._date.transform(new Date(),'yyyy-MM-dd')
        this.typeInput = "Muavin";
        this.getAll();
        let closeBtn = document.getElementById("closeBtn") as HTMLElement;
        closeBtn.click();
      })
    }
  }
  

}
