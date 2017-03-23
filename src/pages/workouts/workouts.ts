import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WorkoutEditPage } from '../workout-edit/workout-edit';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage {

  constructor(private navCtrl: NavController) {}

  ionViewWillEnter() {
  }

  // ------------------------------------------------------------------
  onNewWorkout() {
    console.log('onNewWorkout');
    this.navCtrl.push(WorkoutEditPage);
  }

}
