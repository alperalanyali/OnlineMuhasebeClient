import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-excel-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-loading-button.component.html',
  styleUrls: ['./excel-loading-button.component.css']
})
export class ExcelLoadingButtonComponent {
  isLoading:boolean = false;
  constructor(private  store:Store<{loading:boolean}>){
    this.store.select("loading").subscribe(res => {
      this.isLoading = res
    })
  }
}
