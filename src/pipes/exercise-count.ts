import { Injectable, Pipe } from '@angular/core';

import * as _ from 'lodash';

/*
  Generated class for the ExerciseCount pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'count'
})
@Injectable()
export class ExerciseCountPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    // value = value + ''; // make sure it's a string
    // return value.toLowerCase();


    return _.values(value).length;
  }

}
