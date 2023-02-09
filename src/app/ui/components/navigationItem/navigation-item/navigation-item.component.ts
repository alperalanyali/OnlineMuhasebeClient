import { Component, OnInit, ViewChild } from '@angular/core';

import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationAddComponent } from '../modals/navigationAdd/navigation-add/navigation-add.component';
import { NavigationItemModel } from '../models/navigationItem.model';
import { NavigationItemService } from '../service/navigation-item.service';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';

@Component({
  selector: 'app-navigation-item',
  standalone: true,
  imports: [CommonModule,
            BlankComponent,
            SectionComponent,            
            FormsModule,
            NavigationAddComponent           
            ],
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.css']
})



export class NavigationItemComponent implements OnInit {
  
  navigationItems:NavigationItemModel[] = []
  filterText:string ="";

 
  constructor(
    private _navigationItemService: NavigationItemService
  ){
    
  }

  ngOnInit():void{
    this.getAll();
    
  }
  getAll(){
    this._navigationItemService.getAll(res => {
      this.navigationItems = res.data;
      console.log(this.navigationItems)      
    });
  }
}
