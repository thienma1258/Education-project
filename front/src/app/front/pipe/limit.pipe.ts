import { Pipe, PipeTransform } from '@angular/core';
import {Injectable} from '@angular/core'

@Pipe({
    name: 'limit'
})
@Injectable()
export class LimitPipe implements PipeTransform {
    transform(items: any[], limit:number): any[] {

        if (!items) return [];
            
          return items.slice(0,limit);
           
    }
}