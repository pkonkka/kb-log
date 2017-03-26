import { Injectable, Pipe } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'date'
})
@Injectable()
export class DatePipe {

  transform(value, args) {
    return moment(value).format('DD.MM.YYYY');    
  }

}
