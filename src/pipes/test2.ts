import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Test2 pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'test2'
})
@Injectable()
export class Test2 {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
