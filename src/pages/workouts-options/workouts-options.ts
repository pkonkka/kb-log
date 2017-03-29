import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-workouts-options',
  templateUrl: 'workouts-options.html'
})
export class WorkoutsOptionsPage {

  // ------------------------------------------------------------
  constructor(private viewCtrl: ViewController) {}


  // ------------------------------------------------------------
  onAction(action: string) {

    this.viewCtrl.dismiss({action: action});
    console.log('onAction: ', action);

  }

}
