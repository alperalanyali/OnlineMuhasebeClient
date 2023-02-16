import { Pipe, PipeTransform } from '@angular/core';

import { StringService } from 'src/app/common/models/service/string.service';

@Pipe({
  name: 'ucafPipe',
  standalone: true
})
export class UcafPipe implements PipeTransform {
  constructor(
    private _stringService:StringService
  ){
    
  }
  transform(value: any[],filterText:string): any[] {
    if(filterText ==""){
      return value;
    }

    return value.filter(p=>{
        const code = this._stringService.trLowerCase(p.name).includes(this._stringService.trLowerCase(filterText));
        const name = p.code.includes(this._stringService.trLowerCase(filterText));
        return code + name;
    })
  }

}
