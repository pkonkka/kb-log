import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-exercises-options',
  templateUrl: 'exercises-options.html'
})
export class ExercisesOptionsPage {

  // ------------------------------------------------------------
  constructor(private viewCtrl: ViewController) {}


  // ------------------------------------------------------------
  onAction(action: string) {

    this.viewCtrl.dismiss({action: action});
    console.log('onAction: ', action);

  }

}
