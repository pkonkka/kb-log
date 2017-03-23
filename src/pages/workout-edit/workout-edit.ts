import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-workout-edit',
  templateUrl: 'workout-edit.html'
})
export class WorkoutEditPage {

  constructor(private viewCtrl: ViewController) {}

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }

  onSaveWorkout() {
    console.log('onSaveWorkout');
  }


}
