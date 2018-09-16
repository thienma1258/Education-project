import { NgModule } from '@angular/core';
import { ReversePipe } from './front/pipe/reverse.pipe';
import {OrderByPiPe} from './front/pipe/orderby.pipe';
import {LimitPipe} from './front/pipe/limit.pipe';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [

 ReversePipe,
  OrderByPiPe,
  LimitPipe
  ],
  imports: [

  ],
  exports:[ReversePipe,OrderByPiPe,LimitPipe],
  providers: [],
  bootstrap: []
})
export class PipeModule { }
