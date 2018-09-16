import { Pipe } from "@angular/core";
@Pipe({
  name: "orderBy"
})
export class OrderByPiPe {
  transform(array:  any[], args: string):  any[] {
    array.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}