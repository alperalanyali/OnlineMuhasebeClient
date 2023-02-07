import { Component, OnInit } from '@angular/core';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { UcafModel } from './models/ucaf.model';
import { UcafPipe } from './pipes/ucaf.pipe';
import { UcafService } from './services/ucaf.service';

@Component({
  selector: 'app-ucafs',
  standalone: true,
  imports: [CommonModule,BlankComponent,SectionComponent,UcafPipe,FormsModule],
  templateUrl: './ucafs.component.html',
  styleUrls: ['./ucafs.component.css']
})
export class UcafsComponent implements OnInit {

  navs:NavModel[]= [
    {
      routerLink:"/",
      name:"Ana Sayfa",
      class:""      
    },
    {
      routerLink:"/ucafs",
      name:"Hesap Planı",
      class:""
    }

  ];
  ucafs:UcafModel[];
  filterText:string = "";
  constructor(
    private _ucafService: UcafService
    ){
    
  }
  ngOnInit():void{
    this.getAll();
    
  }
  getAll(){
    this._ucafService.getAll(res => {
       this.ucafs = res.data;      
      console.log(this.ucafs);  
    });
    
  }
}
