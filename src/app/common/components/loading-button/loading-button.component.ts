import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent {
  @Input() isLoading:boolean = false;
  @Input() form:NgForm;
  @Input() btnName:string = '';
  @Input() btnLoadingName:string = '';
  @Input() btnClass:string = 'btn-outline-primary btn-block';
}
