import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';

@Component({
  selector: 'app-ucafs',
  standalone: true,
  imports: [CommonModule,BlankComponent,SectionComponent],
  templateUrl: './ucafs.component.html',
  styleUrls: ['./ucafs.component.css']
})
export class UcafsComponent {

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
}
