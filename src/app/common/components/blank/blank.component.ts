import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NavModel } from './models/navs.model';
import { RouterModule } from '@angular/router';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule,SectionComponent,RouterModule],
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent {
  @Input() title:string ="";
  @Input()  navs:NavModel[] =[]
  
}
