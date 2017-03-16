import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ExerciseEditPage } from '../exercise-edit/exercise-edit';

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage {

  constructor(private navCtrl: NavController) {}

  onNewExercise() {
    this.navCtrl.push(ExerciseEditPage);
    console.log('onAddExercise');
  }

  onSearchExercise() {
    console.log('onSearchExercise');
  }

}
